import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

const lightColors = {
  background: "#F5F7FB",
  card: "#FFFFFF",
  textPrimary: "#0F172A",
  textSecondary: "#6B7280",
  iconBg: "#F3F4F6",
  footer: "#9CA3AF",

  tipBg: "#FFF7ED",
  tipBorder: "#FFD6A5",
  tipIconBg: "#FFEAD4",
  tipTitle: "#D97706",
  tipText: "#B45309",

  insightBlueBg: "#E0F2FE",
  insightBlueBorder: "#BAE6FD",

  insightPurpleBg: "#F3E8FF",
  insightPurpleBorder: "#E9D5FF",

  insightGreenBg: "#DCFCE7",
  insightGreenBorder: "#BBF7D0",
};

const darkColors = {
  background: "#0B1220",
  card: "#111827",
  textPrimary: "#E5E7EB",
  textSecondary: "#9CA3AF",
  iconBg: "#1F2937",
  footer: "#6B7280",

  tipBg: "#1F160A",
  tipBorder: "#92400E",
  tipIconBg: "#2A1B0E",
  tipTitle: "#FBBF24",
  tipText: "#FCD34D",

  insightBlueBg: "#0B1E2D",
  insightBlueBorder: "#1E3A5F",

  insightPurpleBg: "#1B102D",
  insightPurpleBorder: "#3B1E5F",

  insightGreenBg: "#0F2417",
  insightGreenBorder: "#1E4D2B",
};

const appVersion = Constants.expoConfig?.version ?? "1.0.0";

const buildNumber =
  Platform.OS === "ios"
    ? Constants.expoConfig?.ios?.buildNumber
    : Constants.expoConfig?.android?.versionCode;

const versionLabel = `v${appVersion} • Build ${buildNumber}`;

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? darkColors : lightColors;

  type FeatureCardProps = {
    icon: string;
    title: string;
    subtitle: string;
    color: string;
    route: string;
  };

  const footerTexts = [
    "Crafted with care • Satinder Singh Sall",
    "Built with ❤️ by Satinder",
    "Designed & developed by Satinder",
  ];

  const [footerIndex, setFooterIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFooterIndex((prev) => (prev + 1) % footerTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    subtitle,
    color,
    route,
  }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.featureCard,
        { backgroundColor: colors.card, borderColor: color },
      ]}
      onPress={() => router.push(route)}
    >
      <View
        style={[styles.cardIconContainer, { backgroundColor: colors.iconBg }]}
      >
        <MaterialCommunityIcons name={icon} size={26} color={color} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LottieView
          autoPlay
          loop
          style={styles.lottie}
          source={require("../assets/lottie/student.json")}
        />

        <View style={styles.header}>
          <Text style={[styles.appName, { color: colors.textPrimary }]}>
            Course Calculator
          </Text>
          <Text style={[styles.appDesc, { color: colors.textSecondary }]}>
            Smart academic tools for stress-free result calculations
          </Text>
        </View>

        <FeatureCard
          icon="percent"
          title="Percentage Calculator"
          subtitle="Convert marks into clean percentages instantly"
          color="#0D6EFD"
          route="/percentage"
        />

        <FeatureCard
          icon="star-circle"
          title="CGPA Calculator"
          subtitle="Calculate semester-wise weighted GPA"
          color="#6F42C1"
          route="/cgpa"
        />

        <View
          style={[
            styles.tipBox,
            { backgroundColor: colors.tipBg, borderColor: colors.tipBorder },
          ]}
        >
          <View
            style={[
              styles.tipIconCircle,
              { backgroundColor: colors.tipIconBg },
            ]}
          >
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={20}
              color={colors.tipTitle}
            />
          </View>

          <View style={styles.tipTextWrapper}>
            <Text style={[styles.tipTitle, { color: colors.tipTitle }]}>
              Student Tip
            </Text>
            <Text style={[styles.tipText, { color: colors.tipText }]}>
              CGPA is not a simple average — use credits to weight each
              semester.
            </Text>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Smart Insights
          </Text>

          <View
            style={[
              styles.insightCard,
              {
                backgroundColor: colors.insightBlueBg,
                borderColor: colors.insightBlueBorder,
              },
            ]}
          >
            <MaterialCommunityIcons name="brain" size={18} color="#0284C7" />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.insightTitle, { color: colors.textPrimary }]}
              >
                Study 45 → 10 → 5
              </Text>
              <Text
                style={[
                  styles.insightSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                45m focused → 10m review → 5m break. Retention increases 2×.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.insightCard,
              {
                backgroundColor: colors.insightPurpleBg,
                borderColor: colors.insightPurpleBorder,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="star-circle"
              size={18}
              color="#7C3AED"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.insightTitle, { color: colors.textPrimary }]}
              >
                Always boost high-credit subjects
              </Text>
              <Text
                style={[
                  styles.insightSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                Improving 1 heavy credit course impacts CGPA more than 2 small
                ones.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.insightCard,
              {
                backgroundColor: colors.insightGreenBg,
                borderColor: colors.insightGreenBorder,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="book-open-variant"
              size={18}
              color="#22C55E"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.insightTitle, { color: colors.textPrimary }]}
              >
                Review on the same day
              </Text>
              <Text
                style={[
                  styles.insightSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                20 mins after class → 3× exam speed. Memory sticks instantly.
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() =>
            Linking.openURL("https://satinder-portfolio.vercel.app")
          }
          style={styles.footerContainer}
        >
          <Text style={[styles.footerText, { color: colors.footer }]}>
            {footerTexts[footerIndex]}
          </Text>

          <Text style={[styles.footerMeta, { color: colors.footer }]}>
            {versionLabel}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },

  lottie: {
    width: 170,
    height: 170,
    alignSelf: "center",
    marginTop: 10,
  },

  header: { marginBottom: 14, marginTop: 6 },
  appName: { fontSize: 27, fontWeight: "800" },
  appDesc: { fontSize: 14, marginTop: 4, lineHeight: 19 },

  featureCard: {
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  cardIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: { fontSize: 15.6, fontWeight: "600" },
  cardSubtitle: { fontSize: 12.4, marginTop: 2 },

  tipBox: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 10,
  },

  tipIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  tipTextWrapper: { flex: 1 },
  tipTitle: { fontSize: 13.5, fontWeight: "700" },
  tipText: { fontSize: 12.6, lineHeight: 18 },

  sectionBox: { marginTop: 20 },
  sectionTitle: { fontSize: 16.5, fontWeight: "700", marginBottom: 12 },

  insightCard: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    gap: 10,
  },

  insightTitle: { fontSize: 14.3, fontWeight: "700", marginBottom: 2 },
  insightSubtitle: { fontSize: 12.6, lineHeight: 17 },

  footerContainer: {
    marginTop: 32,
    paddingTop: 18,
    paddingBottom: 6,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(150,150,150,0.12)",
  },

  footerText: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.4,
    opacity: 0.9,
    textAlign: "center",
  },

  footerMeta: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0.6,
    opacity: 0.55,
  },
});
