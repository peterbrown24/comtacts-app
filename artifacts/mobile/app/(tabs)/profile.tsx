import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@workspace/api-client-react";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Feather name={icon as any} size={18} color={Colors.textSecondary} style={styles.infoIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });

  if (!user) return null;

  return (
    <ScrollView
      style={[styles.container, { paddingTop: Platform.OS === "web" ? insets.top + 67 : 0 }]}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.hero}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.avatarInitials}</Text>
          </View>
        </View>
        <Text style={styles.heroName}>{user.name}</Text>
        <Text style={styles.heroTitle}>{user.title}</Text>
        <View style={styles.onlinePill}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Info</Text>
        <InfoRow icon="mail" label="Email" value={user.email} />
        <InfoRow icon="briefcase" label="Role" value={user.title} />
        <InfoRow icon="at-sign" label="Member ID" value={`#${user.id.toString().padStart(6, "0")}`} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About</Text>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutText}>
            Comt@cts, Inc. keeps your team connected — real-time messaging, organized channels, and your business contacts all in one place.
          </Text>
        </View>
      </View>

      <View style={styles.versionRow}>
        <Text style={styles.versionText}>Comt@cts, Inc. v1.0.0</Text>
      </View>

      <View style={{ height: Platform.OS === "web" ? 34 : 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  hero: { alignItems: "center", paddingTop: 40, paddingBottom: 32 },
  avatarRing: { width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: Colors.accent, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: Colors.accent + "30", alignItems: "center", justifyContent: "center" },
  avatarText: { color: Colors.accent, fontFamily: "Inter_700Bold", fontSize: 30 },
  heroName: { color: Colors.text, fontFamily: "Inter_700Bold", fontSize: 22, marginBottom: 4 },
  heroTitle: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 15, marginBottom: 12 },
  onlinePill: { flexDirection: "row", alignItems: "center", backgroundColor: Colors.online + "20", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 6 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.online },
  onlineText: { color: Colors.online, fontFamily: "Inter_600SemiBold", fontSize: 13 },
  card: { marginHorizontal: 16, marginBottom: 16, backgroundColor: Colors.bgCard, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: Colors.border },
  cardTitle: { color: Colors.textSecondary, fontFamily: "Inter_600SemiBold", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 16 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  infoIcon: { marginRight: 14 },
  infoLabel: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 12, marginBottom: 2 },
  infoValue: { color: Colors.text, fontFamily: "Inter_500Medium", fontSize: 15 },
  aboutRow: { paddingVertical: 4 },
  aboutText: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 22 },
  versionRow: { alignItems: "center", paddingVertical: 8 },
  versionText: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 13 },
});
