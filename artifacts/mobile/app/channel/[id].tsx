import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChannelMessages, sendChannelMessage, getChannels } from "@/lib/apiWithFallback";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { EncryptionBanner } from "@/components/EncryptionBadge";

type Message = {
  id: number;
  body: string;
  senderName: string;
  senderInitials: string;
  isMine: boolean;
  createdAt: string;
};

function Bubble({ msg }: { msg: Message }) {
  const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (msg.isMine) {
    return (
      <View style={styles.mineRow}>
        <View style={styles.mineBubble}>
          <Text style={styles.mineText}>{msg.body}</Text>
          <Text style={styles.timeTextMine}>{time}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.theirRow}>
      <View style={styles.theirAvatar}>
        <Text style={styles.theirAvatarText}>{msg.senderInitials}</Text>
      </View>
      <View style={styles.theirBubble}>
        <Text style={styles.theirName}>{msg.senderName}</Text>
        <Text style={styles.theirText}>{msg.body}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
  );
}

export default function ChannelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const channelId = parseInt(id);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const qc = useQueryClient();
  const [text, setText] = useState("");
  const flatRef = useRef<FlatList>(null);
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS !== "ios") return;
    const showSub = Keyboard.addListener("keyboardWillShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener("keyboardWillHide", () =>
      setKeyboardHeight(0)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const { data: channels = [] } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannels(),
  });

  const channel = channels.find(c => c.id === channelId);

  useEffect(() => {
    if (channel) {
      navigation.setOptions({ title: `#${channel.name}` });
    }
  }, [channel, navigation]);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["channelMessages", channelId],
    queryFn: () => getChannelMessages(channelId),
    refetchInterval: 2000,
  });

  const sendMutation = useMutation({
    mutationFn: (body: string) => sendChannelMessage(channelId, { body }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["channelMessages", channelId] });
      qc.invalidateQueries({ queryKey: ["channels"] });
      setText("");
    },
  });

  const handleSend = () => {
    if (!text.trim()) return;
    sendMutation.mutate(text.trim());
  };

  const safeBottom = Math.max(insets.bottom, 8) + 8;

  return (
    <View style={[styles.container, { paddingBottom: keyboardHeight > 0 ? keyboardHeight : 0 }]}>
      <EncryptionBanner />
      {channel && (
        <View style={styles.channelHeader}>
          <Feather name="hash" size={14} color={Colors.accent} />
          <Text style={styles.channelDesc}>{channel.description ?? "Team channel"}</Text>
        </View>
      )}
      {isLoading ? (
        <ActivityIndicator color={Colors.accent} style={{ flex: 1 }} />
      ) : (
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Bubble msg={item} />}
          contentContainerStyle={[
            styles.messageList,
            isTablet && { paddingHorizontal: 40, maxWidth: 800, alignSelf: "center", width: "100%" },
          ]}
          onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: false })}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <Text style={styles.emptyChatText}>Be the first to post in this channel</Text>
            </View>
          }
        />
      )}
      <View style={[
        styles.inputBar,
        { paddingBottom: keyboardHeight > 0 ? 8 : safeBottom },
        isTablet && { paddingHorizontal: 40, maxWidth: 800, alignSelf: "center", width: "100%" },
      ]}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={`Message #${channel?.name ?? "channel"}...`}
          placeholderTextColor={Colors.textDim}
          multiline
          maxLength={2000}
        />
        <TouchableOpacity
          style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!text.trim() || sendMutation.isPending}
        >
          {sendMutation.isPending
            ? <ActivityIndicator color="#000" size="small" />
            : <Feather name="send" size={18} color="#000" />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  channelHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, backgroundColor: Colors.bgSecondary, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 6 },
  channelDesc: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 13 },
  messageList: { padding: 16, paddingBottom: 8, flexGrow: 1 },
  mineRow: { alignItems: "flex-end", marginBottom: 12 },
  mineBubble: { backgroundColor: Colors.accent, borderRadius: 18, borderBottomRightRadius: 4, paddingHorizontal: 14, paddingVertical: 10, maxWidth: "78%" },
  mineText: { color: "#000", fontFamily: "Inter_400Regular", fontSize: 15 },
  timeTextMine: { color: "#00000066", fontFamily: "Inter_400Regular", fontSize: 11, marginTop: 4, alignSelf: "flex-end" },
  theirRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 12, gap: 10 },
  theirAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.bgCard, alignItems: "center", justifyContent: "center" },
  theirAvatarText: { color: Colors.accent, fontFamily: "Inter_700Bold", fontSize: 12 },
  theirBubble: { backgroundColor: Colors.bgCard, borderRadius: 18, borderBottomLeftRadius: 4, paddingHorizontal: 14, paddingVertical: 10, maxWidth: "78%", borderWidth: 1, borderColor: Colors.border },
  theirName: { color: Colors.accent, fontFamily: "Inter_600SemiBold", fontSize: 12, marginBottom: 4 },
  theirText: { color: Colors.text, fontFamily: "Inter_400Regular", fontSize: 15 },
  timeText: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 11, marginTop: 4 },
  inputBar: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 12, paddingTop: 8, backgroundColor: Colors.bgSecondary, borderTopWidth: 1, borderTopColor: Colors.border, gap: 10, width: "100%" },
  input: { flex: 1, backgroundColor: Colors.bgCard, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, color: Colors.text, fontFamily: "Inter_400Regular", fontSize: 15, maxHeight: 100, borderWidth: 1, borderColor: Colors.border },
  sendBtn: { width: 40, height: 40, minWidth: 40, minHeight: 40, borderRadius: 20, backgroundColor: Colors.accent, alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 2 },
  sendBtnDisabled: { opacity: 0.4 },
  emptyChat: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 80 },
  emptyChatText: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 15 },
});
