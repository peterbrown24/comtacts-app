import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@workspace/api-client-react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { useSubscription } from "@/lib/revenuecat";
import { PaywallModal } from "@/components/PaywallModal";

const ROYAL_BLUE = "#4169E1";

function StatusDot({ status }: { status: string }) {
  const color = status === "online" ? Colors.online : status === "away" ? Colors.away : Colors.offline;
  return <View style={[styles.statusDot, { backgroundColor: color }]} />;
}

function InfoRow({ icon, label, value, iconColor }: { icon: string; label: string; value: string; iconColor?: string }) {
  return (
    <View style={styles.infoRow}>
      <Feather name={icon as any} size={14} color={iconColor ?? Colors.accent} style={styles.infoIcon} />
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function LockedRow({ label }: { label: string; onUpgrade: () => void }) {
  return (
    <View style={styles.infoRow}>
      <Feather name="lock" size={14} color={ROYAL_BLUE} style={styles.infoIcon} />
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, { color: ROYAL_BLUE }]}>Subscribe to unlock</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { isSubscribed } = useSubscription();
  const [showPaywall, setShowPaywall] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });

  if (!user) return null;

  const hasPremiumInfo = !!(user.mobilePhone || user.personalEmail);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: Platform.OS === "web" ? insets.top + 67 : 0 }]}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.hero}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.avatarInitials}</Text>
            </View>
          </View>
          <StatusDot status={user.status} />
        </View>
        <Text style={styles.heroName}>{user.name}</Text>
        {user.handle ? (
          <Text style={styles.heroHandle}>{user.handle}</Text>
        ) : null}
        {user.title ? (
          <Text style={styles.heroTitle}>
            {user.title}{user.company ? ` · ${user.company}` : ""}
          </Text>
        ) : user.company ? (
          <Text style={styles.heroTitle}>{user.company}</Text>
        ) : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PUBLIC CONTACT INFO</Text>
        <InfoRow icon="mail" label="Work Email" value={user.email} />
        {user.phone ? (
          <InfoRow icon="phone" label="Work Phone" value={user.phone} />
        ) : null}
      </View>

      {hasPremiumInfo && (
        <View style={styles.section}>
          <View style={styles.premiumHeader}>
            <Text style={styles.sectionTitle}>PREMIUM CONTACT INFO</Text>
            {!isSubscribed && (
              <TouchableOpacity style={styles.proBadge} onPress={() => setShowPaywall(true)}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </TouchableOpacity>
            )}
          </View>
          {isSubscribed && user.mobilePhone ? (
            <InfoRow icon="smartphone" label="Mobile Direct" value={user.mobilePhone} />
          ) : user.mobilePhone ? (
            <LockedRow label="Mobile Direct" onUpgrade={() => setShowPaywall(true)} />
          ) : null}
          {isSubscribed && user.personalEmail ? (
            <InfoRow icon="mail" label="Personal Email" value={user.personalEmail} />
          ) : user.personalEmail ? (
            <LockedRow label="Personal Email" onUpgrade={() => setShowPaywall(true)} />
          ) : null}
        </View>
      )}

      <View style={styles.versionRow}>
        <Text style={styles.versionText}>Comt@cts, Inc. v1.0.0</Text>
      </View>

      <View style={{ height: Platform.OS === "web" ? 34 : 100 }} />

      <PaywallModal visible={showPaywall} onClose={() => setShowPaywall(false)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  hero: { alignItems: "center", paddingTop: 40, paddingBottom: 32 },
  avatarWrap: { position: "relative", marginBottom: 16 },
  avatarRing: { width: 96, height: 96, borderRadius: 48, borderWidth: 2, borderColor: Colors.accent, alignItems: "center", justifyContent: "center" },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: Colors.accent + "30", alignItems: "center", justifyContent: "center" },
  avatarText: { color: Colors.accent, fontFamily: "Inter_700Bold", fontSize: 30 },
  statusDot: { position: "absolute", bottom: 4, right: 4, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: Colors.bg },
  heroName: { color: Colors.text, fontFamily: "Inter_700Bold", fontSize: 24, marginBottom: 4 },
  heroHandle: { color: ROYAL_BLUE, fontFamily: "Inter_500Medium", fontSize: 15, marginBottom: 6 },
  heroTitle: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 15 },
  section: { marginHorizontal: 16, marginBottom: 16, backgroundColor: Colors.bgCard, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: Colors.border, gap: 14 },
  sectionTitle: { color: Colors.textDim, fontFamily: "Inter_600SemiBold", fontSize: 11, letterSpacing: 1.2 },
  premiumHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  proBadge: { backgroundColor: ROYAL_BLUE + "22", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  proBadgeText: { color: ROYAL_BLUE, fontFamily: "Inter_700Bold", fontSize: 10, letterSpacing: 1 },
  infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  infoIcon: { marginTop: 2 },
  infoLabel: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 12, marginBottom: 2 },
  infoValue: { color: Colors.text, fontFamily: "Inter_500Medium", fontSize: 14 },
  versionRow: { alignItems: "center", paddingVertical: 8 },
  versionText: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 13 },
});
