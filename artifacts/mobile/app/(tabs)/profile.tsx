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
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isSubscribed } = useSubscription();
  const [showPaywall, setShowPaywall] = useState(false);

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
        {isSubscribed && (
          <View style={styles.premiumBadge}>
            <Feather name="star" size={12} color="#F59E0B" />
            <Text style={styles.premiumBadgeText}>Premium</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONTACT INFO</Text>
        <InfoRow icon="mail" label="Work Email" value={user.email} />
        {user.phone ? (
          <InfoRow icon="phone" label="Work Phone" value={user.phone} />
        ) : null}
        {isSubscribed ? (
          <>
            {user.mobilePhone ? (
              <InfoRow icon="smartphone" label="Mobile Direct" value={user.mobilePhone} iconColor={ROYAL_BLUE} />
            ) : null}
            {user.personalEmail ? (
              <InfoRow icon="mail" label="Personal Email" value={user.personalEmail} iconColor={ROYAL_BLUE} />
            ) : null}
          </>
        ) : (
          <TouchableOpacity style={styles.lockedRow} onPress={() => setShowPaywall(true)} activeOpacity={0.7}>
            <View style={styles.lockedIcon}>
              <Feather name="lock" size={14} color="#F59E0B" />
            </View>
            <View>
              <Text style={styles.lockedLabel}>Mobile Direct & Personal Email</Text>
              <Text style={styles.lockedHint}>Upgrade to Premium to unlock</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {!isSubscribed && (
        <TouchableOpacity style={styles.upgradeCard} onPress={() => setShowPaywall(true)} activeOpacity={0.7}>
          <View style={styles.upgradeLeft}>
            <View style={styles.upgradeIconCircle}>
              <Feather name="star" size={20} color="#F59E0B" />
            </View>
            <View>
              <Text style={styles.upgradeTitle}>Upgrade to Premium</Text>
              <Text style={styles.upgradeDesc}>Unlock all contact details</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color={Colors.textDim} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.referralCard}
        onPress={() => router.push("/referrals")}
        activeOpacity={0.7}
      >
        <View style={styles.referralLeft}>
          <View style={styles.referralIconCircle}>
            <Feather name="users" size={20} color={ROYAL_BLUE} />
          </View>
          <View>
            <Text style={styles.referralTitle}>Refer & Earn</Text>
            <Text style={styles.referralDesc}>Invite others, earn free Premium</Text>
          </View>
        </View>
        <Feather name="chevron-right" size={20} color={Colors.textDim} />
      </TouchableOpacity>

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
  infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  infoIcon: { marginTop: 2 },
  infoLabel: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 12, marginBottom: 2 },
  infoValue: { color: Colors.text, fontFamily: "Inter_500Medium", fontSize: 14 },
  premiumBadge: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10, backgroundColor: "#F59E0B" + "20", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  premiumBadgeText: { color: "#F59E0B", fontFamily: "Inter_600SemiBold", fontSize: 12 },
  lockedRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: Colors.bg, borderRadius: 10, padding: 12 },
  lockedIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: "#F59E0B" + "20", alignItems: "center", justifyContent: "center" },
  lockedLabel: { color: Colors.textSecondary, fontFamily: "Inter_500Medium", fontSize: 14 },
  lockedHint: { color: "#F59E0B", fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  upgradeCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 16, marginBottom: 16, backgroundColor: Colors.bgCard, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: "#F59E0B" + "40" },
  upgradeLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  upgradeIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#F59E0B" + "20", alignItems: "center", justifyContent: "center" },
  upgradeTitle: { color: Colors.text, fontFamily: "Inter_600SemiBold", fontSize: 15 },
  upgradeDesc: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
  referralCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 16, marginBottom: 16, backgroundColor: Colors.bgCard, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: ROYAL_BLUE + "40" },
  referralLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  referralIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: ROYAL_BLUE + "20", alignItems: "center", justifyContent: "center" },
  referralTitle: { color: Colors.text, fontFamily: "Inter_600SemiBold", fontSize: 15 },
  referralDesc: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
  versionRow: { alignItems: "center", paddingVertical: 8 },
  versionText: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 13 },
});
