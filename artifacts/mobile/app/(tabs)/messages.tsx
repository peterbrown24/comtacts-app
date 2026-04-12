import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getConversations } from "@workspace/api-client-react";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

function Avatar({ initials, size = 48 }: { initials: string; size?: number }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

function StatusDot({ status }: { status: string }) {
  const color = status === "online" ? Colors.online : status === "away" ? Colors.away : Colors.offline;
  return <View style={[styles.statusDot, { backgroundColor: color }]} />;
}

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

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(),
    refetchInterval: 3000,
  });

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "web" ? insets.top + 67 : 0 }]}>
      {isLoading ? (
        <ActivityIndicator color={Colors.accent} style={{ marginTop: 40 }} />
      ) : conversations.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="chatbubbles-outline" size={52} color={Colors.textDim} />
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptyText}>Start a conversation from your contacts</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={item => item.id.toString()}
          contentInsetAdjustmentBehavior="automatic"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => router.push(`/conversation/${item.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.avatarWrap}>
                <Avatar initials={item.contactAvatarInitials} />
                <StatusDot status={item.contactStatus} />
              </View>
              <View style={styles.rowInfo}>
                <View style={styles.rowTop}>
                  <Text style={styles.rowName}>{item.contactName}</Text>
                  <Text style={styles.rowTime}>{timeAgo(item.lastMessageAt)}</Text>
                </View>
                <View style={styles.rowBottom}>
                  <View style={styles.rowLastWrap}>
                    <Feather name="lock" size={10} color={Colors.accent + "60"} />
                    <Text style={styles.rowLast} numberOfLines={1}>
                      {item.lastMessage ?? "No messages yet"}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  avatar: { backgroundColor: Colors.accent + "30", alignItems: "center", justifyContent: "center" },
  avatarText: { color: Colors.accent, fontFamily: "Inter_700Bold" },
  avatarWrap: { position: "relative", marginRight: 14 },
  statusDot: { position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: 6, borderWidth: 2, borderColor: Colors.bg },
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
  emptyText: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 15, textAlign: "center", paddingHorizontal: 40 },
});
