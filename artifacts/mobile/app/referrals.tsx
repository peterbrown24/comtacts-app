import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useGetMyReferrals } from "@workspace/api-client-react";
import { Colors } from "@/constants/colors";
import { Stack } from "expo-router";

const ROYAL_BLUE = "#4169E1";
const AMBER = "#F59E0B";
const TEAL = "#00C896";

function TierCard({
  label,
  count,
  rewardDays,
  completed,
  isActive,
}: {
  label: string;
  count: number;
  rewardDays: number;
  completed: number;
  isActive: boolean;
}) {
  const achieved = completed >= count;
  return (
    <View
      style={[
        styles.tierCard,
        achieved && styles.tierCardAchieved,
        isActive && styles.tierCardActive,
      ]}
    >
      <View style={styles.tierLeft}>
        <View
          style={[
            styles.tierIconCircle,
            achieved
              ? { backgroundColor: TEAL + "30" }
              : { backgroundColor: Colors.bg },
          ]}
        >
          <Feather
            name={achieved ? "check-circle" : "gift"}
            size={18}
            color={achieved ? TEAL : Colors.textDim}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.tierLabel, achieved && { color: TEAL }]}>
            {label}
          </Text>
          <Text style={styles.tierProgress}>
            {Math.min(completed, count)} / {count} referrals
          </Text>
        </View>
      </View>
      {achieved && (
        <View style={styles.achievedBadge}>
          <Text style={styles.achievedText}>Earned</Text>
        </View>
      )}
    </View>
  );
}

function ReferralRow({
  name,
  status,
  date,
}: {
  name: string;
  status: string;
  date: string;
}) {
  const statusColor =
    status === "completed" || status === "rewarded" ? TEAL : AMBER;
  const statusLabel =
    status === "completed" || status === "rewarded" ? "Completed" : "Pending";
  return (
    <View style={styles.referralRow}>
      <View style={styles.referralAvatar}>
        <Text style={styles.referralAvatarText}>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.referralName}>{name}</Text>
        <Text style={styles.referralDate}>
          {new Date(date).toLocaleDateString()}
        </Text>
      </View>
      <View style={[styles.statusPill, { backgroundColor: statusColor + "20" }]}>
        <Text style={[styles.statusText, { color: statusColor }]}>
          {statusLabel}
        </Text>
      </View>
    </View>
  );
}

export default function ReferralsScreen() {
  const insets = useSafeAreaInsets();
  const { data, isLoading } = useGetMyReferrals();

  const handleShare = async () => {
    if (!data) return;
    try {
      await Share.share({
        message: `Join me on Comt@cts! Use my referral code: ${data.referralCode}\n\nDownload the app and connect with your team.\n\nWhat's your Comt@ct?`,
      });
    } catch {}
  };

  if (isLoading || !data) {
    return (
      <>
        <Stack.Screen options={{ title: "Referrals" }} />
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator size="large" color={ROYAL_BLUE} />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Referrals" }} />
      <ScrollView
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.heroSection}>
          <View style={styles.heroIconCircle}>
            <Feather name="users" size={28} color={ROYAL_BLUE} />
          </View>
          <Text style={styles.heroTitle}>Share Comt@cts</Text>
          <Text style={styles.heroSubtitle}>
            Invite others and earn free Premium time
          </Text>
        </View>

        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
          <Text style={styles.codeValue}>{data.referralCode}</Text>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Feather name="share-2" size={16} color="#FFF" />
            <Text style={styles.shareButtonText}>Share Code</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.completedReferrals}</Text>
            <Text style={styles.statLabel}>Referrals</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{data.totalRewardDays}</Text>
            <Text style={styles.statLabel}>Days Earned</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {data.currentTier ? data.tiers.findIndex((t) => t.label === data.currentTier) + 1 : 0}
            </Text>
            <Text style={styles.statLabel}>Tier</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>REWARD TIERS</Text>
          {data.tiers.map((tier, i) => (
            <TierCard
              key={i}
              label={tier.label}
              count={tier.count}
              rewardDays={tier.rewardDays}
              completed={data.completedReferrals}
              isActive={
                data.nextTier?.count === tier.count
              }
            />
          ))}
        </View>

        {data.nextTier && (
          <View style={styles.nextTierBanner}>
            <Feather name="trending-up" size={16} color={AMBER} />
            <Text style={styles.nextTierText}>
              {data.nextTier.remaining} more referral
              {data.nextTier.remaining !== 1 ? "s" : ""} to unlock{" "}
              {data.nextTier.label.split("→")[1]?.trim()}
            </Text>
          </View>
        )}

        {data.referrals.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>YOUR REFERRALS</Text>
            {data.referrals.map((ref) => (
              <ReferralRow
                key={ref.id}
                name={ref.referredName ?? "Unknown"}
                status={ref.status}
                date={ref.createdAt}
              />
            ))}
          </View>
        )}

        <View style={{ height: Platform.OS === "web" ? 34 : 100 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  center: { alignItems: "center", justifyContent: "center" },
  heroSection: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 24,
  },
  heroIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ROYAL_BLUE + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    color: Colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    marginBottom: 6,
  },
  heroSubtitle: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
  codeCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: ROYAL_BLUE + "40",
  },
  codeLabel: {
    color: Colors.textDim,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  codeValue: {
    color: ROYAL_BLUE,
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    letterSpacing: 2,
    marginBottom: 20,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: ROYAL_BLUE,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shareButtonText: {
    color: "#FFF",
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statBox: { flex: 1, alignItems: "center" },
  statNumber: {
    color: Colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  sectionTitle: {
    color: Colors.textDim,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.2,
  },
  tierCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.bg,
    borderRadius: 12,
    padding: 14,
  },
  tierCardAchieved: {
    backgroundColor: TEAL + "10",
    borderWidth: 1,
    borderColor: TEAL + "30",
  },
  tierCardActive: {
    borderWidth: 1,
    borderColor: AMBER + "40",
  },
  tierLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  tierIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  tierLabel: {
    color: Colors.text,
    fontFamily: "Inter_500Medium",
    fontSize: 14,
  },
  tierProgress: {
    color: Colors.textDim,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    marginTop: 2,
  },
  achievedBadge: {
    backgroundColor: TEAL + "20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  achievedText: {
    color: TEAL,
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
  },
  nextTierBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: AMBER + "15",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: AMBER + "30",
  },
  nextTierText: {
    color: AMBER,
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    flex: 1,
  },
  referralRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 4,
  },
  referralAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  referralAvatarText: {
    color: Colors.accent,
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  referralName: {
    color: Colors.text,
    fontFamily: "Inter_500Medium",
    fontSize: 14,
  },
  referralDate: {
    color: Colors.textDim,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    marginTop: 1,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
  },
});
