import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getConversationMessages, sendConversationMessage, getConversations } from "@workspace/api-client-react";
import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Colors } from "@/constants/colors";
import { useEffect } from "react";

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

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const convId = parseInt(id);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const qc = useQueryClient();
  const [text, setText] = useState("");
  const flatRef = useRef<FlatList>(null);

  const { data: convos = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(),
  });

  const convo = convos.find(c => c.id === convId);

  useEffect(() => {
    if (convo) {
      navigation.setOptions({ title: convo.contactName });
    }
  }, [convo, navigation]);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", convId],
    queryFn: () => getConversationMessages({ conversationId: convId }),
    refetchInterval: 2000,
  });

  const sendMutation = useMutation({
    mutationFn: (body: string) => sendConversationMessage({ conversationId: convId, body: { body } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["messages", convId] });
      qc.invalidateQueries({ queryKey: ["conversations"] });
      setText("");
    },
  });

  const handleSend = () => {
    if (!text.trim()) return;
    sendMutation.mutate(text.trim());
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.accent} style={{ flex: 1 }} />
      ) : (
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Bubble msg={item} />}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: false })}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <Text style={styles.emptyChatText}>Start the conversation</Text>
            </View>
          }
        />
      )}
      <View style={[styles.inputBar, { paddingBottom: insets.bottom + 8 }]}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Message..."
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
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
  inputBar: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 12, paddingTop: 8, backgroundColor: Colors.bgSecondary, borderTopWidth: 1, borderTopColor: Colors.border, gap: 10 },
  input: { flex: 1, backgroundColor: Colors.bgCard, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, color: Colors.text, fontFamily: "Inter_400Regular", fontSize: 15, maxHeight: 100, borderWidth: 1, borderColor: Colors.border },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.accent, alignItems: "center", justifyContent: "center" },
  sendBtnDisabled: { opacity: 0.4 },
  emptyChat: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 80 },
  emptyChatText: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 15 },
});
