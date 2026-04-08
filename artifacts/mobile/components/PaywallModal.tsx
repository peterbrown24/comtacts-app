import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSubscription } from "@/lib/revenuecat";
import { Colors } from "@/constants/colors";

const ROYAL_BLUE = "#4169E1";

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
}

export function PaywallModal({ visible, onClose }: PaywallModalProps) {
  const { offerings, purchase, isPurchasing, restore, isRestoring } = useSubscription();
  const [confirmPkg, setConfirmPkg] = useState<any>(null);

  const currentOffering = offerings?.current;
  const packages = currentOffering?.availablePackages ?? [];

  const handlePurchase = async (pkg: any) => {
    setConfirmPkg(pkg);
  };

  const confirmPurchase = async () => {
    if (!confirmPkg) return;
    try {
      await purchase(confirmPkg);
      setConfirmPkg(null);
      onClose();
    } catch (e: any) {
      if (e?.userCancelled) return;
      console.error("Purchase failed:", e);
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
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upgrade to Premium</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Feather name="x" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
          <View style={styles.iconCircle}>
            <Feather name="star" size={36} color="#F59E0B" />
          </View>

          <Text style={styles.title}>Comt@cts Premium</Text>
          <Text style={styles.subtitle}>Unlock powerful business features</Text>

          <View style={styles.features}>
            <FeatureRow icon="smartphone" text="Mobile Direct numbers" />
            <FeatureRow icon="mail" text="Personal email addresses" />
            <FeatureRow icon="shield" text="V/M Vendor-Merchant badges" />
            <FeatureRow icon="zap" text="Priority contact support" />
          </View>

          {packages.length > 0 ? (
            packages.map((pkg) => (
              <TouchableOpacity
                key={pkg.identifier}
                style={styles.packageCard}
                onPress={() => handlePurchase(pkg)}
                disabled={isPurchasing}
                activeOpacity={0.7}
              >
                <View style={styles.packageInfo}>
                  <Text style={styles.packageName}>{pkg.product.title || "Premium Monthly"}</Text>
                  <Text style={styles.packageDesc}>{pkg.product.description || "Full access to all premium features"}</Text>
                </View>
                <View style={styles.priceBox}>
                  <Text style={styles.priceText}>{pkg.product.priceString || "$9.99"}</Text>
                  <Text style={styles.pricePeriod}>/month</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.loadingPkgs}>
              <ActivityIndicator color={Colors.accent} />
              <Text style={styles.loadingText}>Loading subscription options...</Text>
            </View>
          )}

          <TouchableOpacity style={styles.restoreBtn} onPress={handleRestore} disabled={isRestoring}>
            {isRestoring ? (
              <ActivityIndicator color={Colors.textSecondary} size="small" />
            ) : (
              <Text style={styles.restoreText}>Restore Purchases</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Modal visible={!!confirmPkg} transparent animationType="fade">
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmTitle}>Confirm Purchase</Text>
            <Text style={styles.confirmDesc}>
              Subscribe to {confirmPkg?.product.title || "Premium Monthly"} for{" "}
              {confirmPkg?.product.priceString || "$9.99"}/month?
            </Text>
            <View style={styles.confirmActions}>
              <TouchableOpacity
                style={styles.confirmCancel}
                onPress={() => setConfirmPkg(null)}
              >
                <Text style={styles.confirmCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBuy}
                onPress={confirmPurchase}
                disabled={isPurchasing}
              >
                {isPurchasing ? (
                  <ActivityIndicator color="#000" size="small" />
                ) : (
                  <Text style={styles.confirmBuyText}>Subscribe</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
}

function FeatureRow({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIcon}>
        <Feather name={icon as any} size={16} color={Colors.accent} />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: { color: Colors.text, fontFamily: "Inter_700Bold", fontSize: 18 },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.bgCard, alignItems: "center", justifyContent: "center" },
  content: { flex: 1 },
  contentInner: { paddingHorizontal: 20, paddingBottom: 40, alignItems: "center" },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F59E0B" + "20",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: { color: Colors.text, fontFamily: "Inter_700Bold", fontSize: 26, marginBottom: 8 },
  subtitle: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 16, marginBottom: 32 },
  features: { width: "100%", gap: 16, marginBottom: 32 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.accent + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: { color: Colors.text, fontFamily: "Inter_500Medium", fontSize: 15 },
  packageCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: ROYAL_BLUE,
    marginBottom: 16,
  },
  packageInfo: { flex: 1, marginRight: 12 },
  packageName: { color: Colors.text, fontFamily: "Inter_600SemiBold", fontSize: 16, marginBottom: 4 },
  packageDesc: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 13 },
  priceBox: { alignItems: "center" },
  priceText: { color: ROYAL_BLUE, fontFamily: "Inter_700Bold", fontSize: 22 },
  pricePeriod: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 12 },
  loadingPkgs: { alignItems: "center", gap: 12, paddingVertical: 20 },
  loadingText: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 14 },
  restoreBtn: { paddingVertical: 16 },
  restoreText: { color: Colors.textSecondary, fontFamily: "Inter_500Medium", fontSize: 14 },
  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  confirmCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 340,
  },
  confirmTitle: { color: Colors.text, fontFamily: "Inter_700Bold", fontSize: 20, marginBottom: 12, textAlign: "center" },
  confirmDesc: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 15, textAlign: "center", marginBottom: 24 },
  confirmActions: { flexDirection: "row", gap: 12 },
  confirmCancel: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.bg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  confirmCancelText: { color: Colors.text, fontFamily: "Inter_600SemiBold", fontSize: 15 },
  confirmBuy: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    alignItems: "center",
  },
  confirmBuyText: { color: "#000", fontFamily: "Inter_700Bold", fontSize: 15 },
});
