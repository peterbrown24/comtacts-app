import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSubscription } from "@/lib/revenuecat";
import { Colors } from "@/constants/colors";

const ROYAL_BLUE = "#4169E1";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function PaywallModal({ visible, onClose }: Props) {
  const { offerings, purchase, restore, isPurchasing, isRestoring } = useSubscription();

  const currentOffering = offerings?.current;
  const pkg = currentOffering?.availablePackages[0];
  const priceString = pkg?.product.priceString ?? "—";
  const period = pkg?.product.subscriptionPeriod ?? "";
  const periodLabel = period === "P1M" ? "/month" : period === "P1Y" ? "/year" : period === "P1W" ? "/week" : "";

  const [showConfirm, setShowConfirm] = React.useState(false);

  const handlePurchase = () => {
    if (!pkg) return;
    setShowConfirm(true);
  };

  const confirmPurchase = async () => {
    if (!pkg) return;
    setShowConfirm(false);
    try {
      await purchase(pkg);
      onClose();
    } catch (e: any) {
      if (e?.code !== "1") {
        console.error("Purchase failed:", e);
      }
    }
  };

  const handleRestore = async () => {
    try {
      await restore();
      onClose();
    } catch (e) {
      console.error("Restore failed:", e);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Feather name="x" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>PREMIUM</Text>
        </View>

        <Text style={styles.headline}>Unlock Full Contact Details</Text>
        <Text style={styles.sub}>
          Upgrade to Premium to access direct mobile numbers and personal email addresses for all your contacts.
        </Text>

        <View style={styles.features}>
          {[
            { icon: "phone", label: "Mobile direct numbers" },
            { icon: "mail", label: "Personal email addresses" },
            { icon: "star", label: "Priority contact profile access" },
            { icon: "shield", label: "Secure, encrypted data handling" },
          ].map(({ icon, label }) => (
            <View key={label} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Feather name={icon as any} size={16} color={ROYAL_BLUE} />
              </View>
              <Text style={styles.featureText}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceBox}>
          <Text style={styles.price}>{priceString}</Text>
          <Text style={styles.pricePeriod}>{periodLabel}</Text>
        </View>

        <TouchableOpacity
          style={[styles.upgradeBtn, (isPurchasing || !pkg) && styles.upgradeBtnDisabled]}
          onPress={handlePurchase}
          disabled={isPurchasing || !pkg}
        >
          {isPurchasing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.upgradeBtnText}>Upgrade to Premium</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.restoreBtn}
          onPress={handleRestore}
          disabled={isRestoring}
        >
          {isRestoring ? (
            <ActivityIndicator color={Colors.textSecondary} size="small" />
          ) : (
            <Text style={styles.restoreText}>Restore Purchases</Text>
          )}
        </TouchableOpacity>

        {showConfirm && (
          <View style={styles.confirmOverlay}>
            <View style={styles.confirmBox}>
              <Text style={styles.confirmTitle}>Confirm Purchase</Text>
              <Text style={styles.confirmSub}>
                You are about to purchase{" "}
                <Text style={{ color: Colors.text }}>
                  {pkg?.product.title ?? "Premium"} for {priceString}{periodLabel}
                </Text>
                . Continue?
              </Text>
              <View style={styles.confirmBtns}>
                <TouchableOpacity style={styles.confirmCancel} onPress={() => setShowConfirm(false)}>
                  <Text style={styles.confirmCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmOk} onPress={confirmPurchase}>
                  <Text style={styles.confirmOkText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: "center",
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 4,
    marginBottom: 24,
  },
  badge: {
    backgroundColor: ROYAL_BLUE + "22",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 20,
  },
  badgeText: {
    color: ROYAL_BLUE,
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 2,
  },
  headline: {
    color: Colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
  },
  sub: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  features: {
    width: "100%",
    gap: 14,
    marginBottom: 32,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: ROYAL_BLUE + "18",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    color: Colors.text,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
    gap: 4,
  },
  price: {
    color: Colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 34,
  },
  pricePeriod: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    paddingBottom: 4,
  },
  upgradeBtn: {
    width: "100%",
    backgroundColor: ROYAL_BLUE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 14,
  },
  upgradeBtnDisabled: { opacity: 0.5 },
  upgradeBtnText: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 16,
  },
  restoreBtn: {
    paddingVertical: 8,
  },
  restoreText: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
  confirmOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  confirmBox: {
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 24,
    width: "100%",
  },
  confirmTitle: {
    color: Colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    marginBottom: 10,
  },
  confirmSub: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  confirmBtns: {
    flexDirection: "row",
    gap: 12,
  },
  confirmCancel: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmCancelText: {
    color: Colors.textSecondary,
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
  confirmOk: {
    flex: 1,
    backgroundColor: ROYAL_BLUE,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  confirmOkText: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
    fontSize: 15,
  },
});
