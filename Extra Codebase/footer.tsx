import React from "react";
import { View, StyleSheet, Pressable, Linking } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Platform } from "react-native";

type FooterProps = {
  colors: {
    textPrimary: string;
    textSecondary: string;
    footer: string;
  };
};

const appVersion = Constants.expoConfig?.version ?? "1.0.0";

const buildNumber =
  Platform.OS === "ios"
    ? Constants.expoConfig?.ios?.buildNumber
    : Constants.expoConfig?.android?.versionCode;

const versionLabel = `v${appVersion} • Build ${buildNumber}`;

export default function Footer({ colors }: FooterProps) {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.brandRow}>
        <MaterialCommunityIcons
          name="calculator-variant"
          size={18}
          color={colors.textSecondary}
        />
        <Text style={[styles.footerBrand, { color: colors.textPrimary }]}>
          Course Calculator
        </Text>
      </View>

      <Text style={[styles.footerMeta, { color: colors.footer }]}>
        {versionLabel}
      </Text>

      <Pressable
        onPress={() => Linking.openURL("https://satinder-portfolio.vercel.app")}
      >
        <Text style={[styles.footerLink, { color: colors.textSecondary }]}>
          © {new Date().getFullYear()} Satinder Singh Sall
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 36,
    paddingTop: 20,
    paddingBottom: 6,
    alignItems: "center",
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(150,150,150,0.12)",
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  footerBrand: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  footerMeta: {
    fontSize: 12.5,
    opacity: 0.6,
  },

  footerLink: {
    fontSize: 12.8,
    marginTop: 4,
    opacity: 0.85,
  },
});
