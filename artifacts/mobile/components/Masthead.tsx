import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

const ROYAL_BLUE = "#4169E1";

export function Masthead() {
  return (
    <View style={styles.container}>
      <View style={styles.logoMark}>
        <Text style={styles.atSymbol}>@</Text>
      </View>
      <View style={styles.wordmark}>
        <Text style={styles.wordmarkText}>
          <Text style={styles.wordmarkBold}>Comt</Text>
          <Text style={styles.wordmarkAt}>@</Text>
          <Text style={styles.wordmarkBold}>cts</Text>
          <Text style={styles.wordmarkComma}>, Inc.</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoMark: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: ROYAL_BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  atSymbol: {
    color: "#FFB800",
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    lineHeight: 18,
  },
  wordmark: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  wordmarkText: {
    fontSize: 18,
  },
  wordmarkBold: {
    color: Colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 18,
  },
  wordmarkAt: {
    color: "#FFB800",
    fontFamily: "Inter_700Bold",
    fontSize: 18,
  },
  wordmarkComma: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
});
