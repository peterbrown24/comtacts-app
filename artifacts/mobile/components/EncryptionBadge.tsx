import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

const SHIELD_GREEN = "#00C896";

export function EncryptionBadge({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <View style={styles.compactBadge}>
        <Feather name="lock" size={10} color={SHIELD_GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.badge}>
      <Feather name="shield" size={12} color={SHIELD_GREEN} />
      <Text style={styles.badgeText}>Encrypted</Text>
    </View>
  );
}

export function EncryptionBanner() {
  return (
    <View style={styles.banner}>
      <View style={styles.bannerIcon}>
        <Feather name="shield" size={14} color={SHIELD_GREEN} />
      </View>
      <Text style={styles.bannerText}>
        Messages are encrypted with AES-256
      </Text>
      <Feather name="lock" size={12} color={Colors.textDim} />
    </View>
  );
}

export function PrivacyShield() {
  return (
    <View style={styles.shield}>
      <View style={styles.shieldIconWrap}>
        <Feather name="shield" size={20} color={SHIELD_GREEN} />
        <View style={styles.shieldCheck}>
          <Feather name="check" size={8} color="#000" />
        </View>
      </View>
      <View style={styles.shieldInfo}>
        <Text style={styles.shieldTitle}>End-to-End Encrypted</Text>
        <Text style={styles.shieldDesc}>
          Your messages and data are protected with AES-256-GCM encryption
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: SHIELD_GREEN + "15",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    color: SHIELD_GREEN,
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    letterSpacing: 0.3,
  },
  compactBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: SHIELD_GREEN + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: SHIELD_GREEN + "08",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 6,
  },
  bannerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: SHIELD_GREEN + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 11,
  },
  shield: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: SHIELD_GREEN + "30",
  },
  shieldIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: SHIELD_GREEN + "15",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  shieldCheck: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: SHIELD_GREEN,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.bgCard,
  },
  shieldInfo: {
    flex: 1,
  },
  shieldTitle: {
    color: Colors.text,
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    marginBottom: 3,
  },
  shieldDesc: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
  },
});
