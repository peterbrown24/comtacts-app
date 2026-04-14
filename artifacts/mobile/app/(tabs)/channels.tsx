import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChannels, createChannel } from "@/lib/apiWithFallback";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/colors";

function timeAgo(isoString?: string | null) {
  if (!isoString) return "";
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

export default function ChannelsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDesc, setChannelDesc] = useState("");

  const { data: channels = [], isLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: () => getChannels(),
    refetchInterval: 4000,
  });

  const createMutation = useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["channels"] });
      setShowCreate(false);
      setChannelName("");
      setChannelDesc("");
    },
  });

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "web" ? insets.top + 67 : 0 }]}>
      <View style={styles.header}>
        <Text style={styles.sectionLabel}>Team Channels</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowCreate(true)}>
          <Feather name="plus" size={20} color={Colors.accent} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator color={Colors.accent} style={{ marginTop: 40 }} />
      ) : channels.length === 0 ? (
        <View style={styles.empty}>
          <Feather name="hash" size={52} color={Colors.textDim} />
          <Text style={styles.emptyTitle}>No channels yet</Text>
          <Text style={styles.emptyText}>Create a channel for your team</Text>
          <TouchableOpacity style={styles.createBtn} onPress={() => setShowCreate(true)}>
            <Text style={styles.createBtnText}>Create Channel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={channels}
          keyExtractor={item => item.id.toString()}
          contentInsetAdjustmentBehavior="automatic"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push(`/channel/${item.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.hashBox}>
                <Feather name="hash" size={20} color={Colors.accent} />
              </View>
              <View style={styles.rowInfo}>
                <View style={styles.rowTop}>
                  <Text style={styles.rowName}>{item.name}</Text>
                  <Text style={styles.rowTime}>{timeAgo(item.lastMessageAt)}</Text>
                </View>
                <View style={styles.rowBottom}>
                  <View style={styles.rowLastWrap}>
                    <Feather name="lock" size={10} color={Colors.accent + "60"} />
                    <Text style={styles.rowLast} numberOfLines={1}>
                      {item.lastMessage ?? (item.description ?? "No messages yet")}
                    </Text>
                  </View>
                  {item.unreadCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      <Modal visible={showCreate} animationType="slide" presentationStyle="pageSheet">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Channel</Text>
              <TouchableOpacity onPress={() => { setShowCreate(false); setChannelName(""); setChannelDesc(""); }}>
                <Feather name="x" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Channel Name *</Text>
              <TextInput
                style={styles.fieldInput}
                value={channelName}
                onChangeText={setChannelName}
                placeholder="e.g. general, engineering"
                placeholderTextColor={Colors.textDim}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Description</Text>
              <TextInput
                style={[styles.fieldInput, { height: 80 }]}
                value={channelDesc}
                onChangeText={setChannelDesc}
                placeholder="What is this channel for?"
                placeholderTextColor={Colors.textDim}
                multiline
              />
            </View>
            <TouchableOpacity
              style={[styles.saveBtn, !channelName && styles.saveBtnDisabled]}
              disabled={!channelName || createMutation.isPending}
              onPress={() => createMutation.mutate({ name: channelName, description: channelDesc || undefined })}
            >
              {createMutation.isPending
                ? <ActivityIndicator color="#000" />
                : <Text style={styles.saveBtnText}>Create Channel</Text>
              }
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  sectionLabel: { color: Colors.textSecondary, fontFamily: "Inter_600SemiBold", fontSize: 13, textTransform: "uppercase", letterSpacing: 0.8 },
  addBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.bgCard, alignItems: "center", justifyContent: "center" },
  hashBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.accent + "20", alignItems: "center", justifyContent: "center", marginRight: 14 },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  rowInfo: { flex: 1 },
  rowTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  rowName: { color: Colors.text, fontFamily: "Inter_600SemiBold", fontSize: 15 },
  rowTime: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 12 },
  rowBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowLastWrap: { flexDirection: "row", alignItems: "center", gap: 4, flex: 1 },
  rowLast: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 14, flex: 1 },
  badge: { backgroundColor: Colors.accent, borderRadius: 10, minWidth: 20, height: 20, alignItems: "center", justifyContent: "center", paddingHorizontal: 6, marginLeft: 8 },
  badgeText: { color: "#000", fontFamily: "Inter_700Bold", fontSize: 11 },
  separator: { height: 1, backgroundColor: Colors.border, marginLeft: 78 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  emptyTitle: { color: Colors.text, fontFamily: "Inter_600SemiBold", fontSize: 18 },
  emptyText: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 15 },
  createBtn: { marginTop: 8, backgroundColor: Colors.accent, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14 },
  createBtnText: { color: "#000", fontFamily: "Inter_700Bold", fontSize: 15 },
  modal: { flex: 1, backgroundColor: Colors.bg, paddingTop: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingBottom: 24 },
  modalTitle: { color: Colors.text, fontFamily: "Inter_700Bold", fontSize: 20 },
  field: { paddingHorizontal: 20, marginBottom: 16 },
  fieldLabel: { color: Colors.textSecondary, fontFamily: "Inter_500Medium", fontSize: 13, marginBottom: 6 },
  fieldInput: { backgroundColor: Colors.bgCard, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, color: Colors.text, fontFamily: "Inter_400Regular", fontSize: 15, borderWidth: 1, borderColor: Colors.border },
  saveBtn: { marginHorizontal: 20, marginTop: 8, backgroundColor: Colors.accent, borderRadius: 12, paddingVertical: 16, alignItems: "center" },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnText: { color: "#000", fontFamily: "Inter_700Bold", fontSize: 16 },
});
