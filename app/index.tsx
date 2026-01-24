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
  border: "rgba(15, 23, 42, 0.08)",

  primary: "#0D6EFD",
  purple: "#6F42C1",

  heroBg: "#EEF2FF",

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
  border: "rgba(255,255,255,0.08)",

  primary: "#3B82F6",
  purple: "#A78BFA",

  heroBg: "#0F172A",

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

  const FeatureCard = ({
    icon,
    title,
    subtitle,
    color,
    route,
    badge,
  }: {
    icon: string;
    title: string;
    subtitle: string;
    color: string;
    route: string;
    badge?: string;
  }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.featureCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
      onPress={() => router.push(route)}
    >
      <View style={[styles.featureIcon, { backgroundColor: colors.iconBg }]}>
        <MaterialCommunityIcons name={icon} size={24} color={color} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.featureTitleRow}>
          <Text style={[styles.featureTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>

          {!!badge && (
            <View
              style={[
                styles.badge,
                { backgroundColor: scheme === "dark" ? "#1F2937" : "#EEF2FF" },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: scheme === "dark" ? "#93C5FD" : "#1D4ED8" },
                ]}
              >
                {badge}
              </Text>
            </View>
          )}
        </View>

        <Text style={[styles.featureSubtitle, { color: colors.textSecondary }]}>
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

  const StatCard = ({
    icon,
    value,
    label,
  }: {
    icon: string;
    value: string;
    label: string;
  }) => (
    <View
      style={[
        styles.statCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={[styles.statIcon, { backgroundColor: colors.iconBg }]}>
        <MaterialCommunityIcons
          name={icon}
          size={18}
          color={colors.textSecondary}
        />
      </View>

      <Text style={[styles.statValue, { color: colors.textPrimary }]}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );

  const InsightCard = ({
    icon,
    title,
    subtitle,
    bg,
    border,
    iconColor,
  }: {
    icon: string;
    title: string;
    subtitle: string;
    bg: string;
    border: string;
    iconColor: string;
  }) => (
    <View
      style={[styles.insightCard, { backgroundColor: bg, borderColor: border }]}
    >
      <View
        style={[
          styles.insightIcon,
          { backgroundColor: "rgba(255,255,255,0.35)" },
        ]}
      >
        <MaterialCommunityIcons name={icon} size={18} color={iconColor} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.insightTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.insightSubtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <View>
            <Text style={[styles.topTitle, { color: colors.textPrimary }]}>
              Dashboard
            </Text>
            <Text style={[styles.topSub, { color: colors.textSecondary }]}>
              Course Calculator
            </Text>
          </View>

          <View style={styles.topActions}>
            <Pressable style={styles.actionBtn}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={22}
                color={colors.textSecondary}
              />
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <MaterialCommunityIcons
                name="cog-outline"
                size={22}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        {/* HERO (NO OVERLAP) */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: colors.heroBg, borderColor: colors.border },
          ]}
        >
          <View style={styles.heroTopRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>
                Welcome back 👋
              </Text>
              <Text
                style={[styles.heroSubtitle, { color: colors.textSecondary }]}
              >
                Calculate percentage and CGPA faster with clean results.
              </Text>
            </View>

            <LottieView
              autoPlay
              loop
              style={styles.heroLottie}
              source={require("../assets/lottie/student.json")}
            />
          </View>

          {/* BUTTONS FULL WIDTH */}
          <View style={styles.heroButtonsCol}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.heroBtn, { backgroundColor: colors.primary }]}
              onPress={() => router.push("/percentage")}
            >
              <MaterialCommunityIcons name="percent" size={20} color="#fff" />
              <Text style={styles.heroBtnText}>Quick Percentage</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.heroBtn,
                {
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => router.push("/cgpa")}
            >
              <MaterialCommunityIcons
                name="star-circle"
                size={20}
                color={colors.purple}
              />
              <Text style={[styles.heroBtnText, { color: colors.textPrimary }]}>
                CGPA Calculator
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* OVERVIEW */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Overview
          </Text>
          <Text style={[styles.sectionHint, { color: colors.textSecondary }]}>
            Your quick academic dashboard
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard icon="calculator-variant-outline" value="2" label="Tools" />
          <StatCard icon="clock-outline" value="< 10s" label="Fast" />
          <StatCard icon="shield-check-outline" value="100%" label="Accurate" />
        </View>

        {/* TOOLS */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Tools
          </Text>
          <Text style={[styles.sectionHint, { color: colors.textSecondary }]}>
            Choose what you want to calculate
          </Text>
        </View>

        <FeatureCard
          icon="percent"
          title="Percentage Calculator"
          subtitle="Convert marks into clean percentages instantly"
          color={colors.primary}
          route="/percentage"
          badge="POPULAR"
        />

        <FeatureCard
          icon="star-circle"
          title="CGPA Calculator"
          subtitle="Calculate semester-wise weighted GPA"
          color={colors.purple}
          route="/cgpa"
          badge="SMART"
        />

        {/* TIP */}
        <View
          style={[
            styles.tipBox,
            { backgroundColor: colors.tipBg, borderColor: colors.tipBorder },
          ]}
        >
          <View style={[styles.tipIcon, { backgroundColor: colors.tipIconBg }]}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={20}
              color={colors.tipTitle}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[styles.tipTitle, { color: colors.tipTitle }]}>
              Student Tip
            </Text>
            <Text style={[styles.tipText, { color: colors.tipText }]}>
              CGPA is not a simple average — use credits to weight each
              semester.
            </Text>
          </View>
        </View>

        {/* INSIGHTS */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Smart Insights
          </Text>
          <Text style={[styles.sectionHint, { color: colors.textSecondary }]}>
            Improve performance with small habits
          </Text>
        </View>

        <InsightCard
          icon="brain"
          title="Study 45 → 10 → 5"
          subtitle="45m focus → 10m review → 5m break. Retention improves a lot."
          bg={colors.insightBlueBg}
          border={colors.insightBlueBorder}
          iconColor="#0284C7"
        />

        <InsightCard
          icon="star-circle"
          title="Boost high-credit subjects"
          subtitle="Improving 1 heavy credit course impacts CGPA more than 2 small ones."
          bg={colors.insightPurpleBg}
          border={colors.insightPurpleBorder}
          iconColor="#7C3AED"
        />

        <InsightCard
          icon="book-open-variant"
          title="Review on the same day"
          subtitle="20 mins after class helps memory stick and improves exam speed."
          bg={colors.insightGreenBg}
          border={colors.insightGreenBorder}
          iconColor="#22C55E"
        />

        {/* FOOTER */}
        <Pressable
          onPress={() =>
            Linking.openURL("https://satinder-portfolio.vercel.app")
          }
          style={[styles.footerContainer, { borderTopColor: colors.border }]}
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
  scrollContent: { paddingHorizontal: 18, paddingBottom: 28 },

  /* TOP BAR */
  topBar: {
    marginTop: 6,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topTitle: { fontSize: 20, fontWeight: "800" },
  topSub: { fontSize: 13, marginTop: 2, opacity: 0.85 },
  topActions: { flexDirection: "row", gap: 10 },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  /* HERO */
  heroCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  heroTitle: { fontSize: 18, fontWeight: "800" },
  heroSubtitle: { fontSize: 13, marginTop: 6, lineHeight: 18, opacity: 0.9 },

  heroLottie: {
    width: 140,
    height: 140,
  },

  heroButtonsCol: {
    marginTop: 14,
    gap: 10,
  },
  heroBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
  },
  heroBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14.2,
  },

  /* SECTIONS */
  sectionHeader: { marginTop: 18, marginBottom: 10 },
  sectionTitle: { fontSize: 16.5, fontWeight: "800" },
  sectionHint: { fontSize: 12.4, marginTop: 2, opacity: 0.85 },

  /* STATS */
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statValue: { fontSize: 16, fontWeight: "800" },
  statLabel: { fontSize: 12.2, marginTop: 2 },

  /* TOOLS */
  featureCard: {
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  featureTitle: { fontSize: 15.4, fontWeight: "700" },
  featureSubtitle: { fontSize: 12.3, marginTop: 2, lineHeight: 16.5 },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: { fontSize: 10.8, fontWeight: "800", letterSpacing: 0.4 },

  /* TIP */
  tipBox: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 6,
  },
  tipIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  tipTitle: { fontSize: 13.2, fontWeight: "800" },
  tipText: { fontSize: 12.5, lineHeight: 17.5 },

  /* INSIGHTS */
  insightCard: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  insightIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  insightTitle: { fontSize: 13.8, fontWeight: "800", marginBottom: 2 },
  insightSubtitle: { fontSize: 12.4, lineHeight: 17 },

  /* FOOTER */
  footerContainer: {
    marginTop: 24,
    paddingTop: 18,
    paddingBottom: 6,
    alignItems: "center",
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 13.5,
    fontWeight: "600",
    letterSpacing: 0.3,
    opacity: 0.9,
    textAlign: "center",
  },
  footerMeta: {
    marginTop: 4,
    fontSize: 12.8,
    fontWeight: "400",
    letterSpacing: 0.5,
    opacity: 0.55,
  },
});
