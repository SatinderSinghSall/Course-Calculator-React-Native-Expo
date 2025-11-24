import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  type FeatureCardProps = {
    icon: string;
    title: string;
    subtitle: string;
    color: string;
    route: string;
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    subtitle,
    color,
    route,
  }) => (
    <View>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.featureCard, { borderColor: color }]}
        onPress={() => router.push(route)}
      >
        <View style={styles.cardIconContainer}>
          <MaterialCommunityIcons name={icon} size={26} color={color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color="#9CA3AF"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO animation kept */}
        <View>
          <LottieView
            autoPlay
            loop
            style={styles.lottie}
            source={require("../assets/lottie/student.json")}
          />
        </View>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.appName}>Course Calculator</Text>
          <Text style={styles.appDesc}>
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

        {/* Tip box */}
        <View style={styles.tipBox}>
          <View style={styles.tipIconCircle}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={20}
              color="#FB923C"
            />
          </View>
          <View style={styles.tipTextWrapper}>
            <Text style={styles.tipTitle}>Student Tip</Text>
            <Text style={styles.tipText}>
              CGPA is not a simple average — use credits to weight each
              semester.
            </Text>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Smart Insights</Text>

          <View style={styles.insightCardBlue}>
            <View style={styles.insightIcon}>
              <MaterialCommunityIcons name="brain" size={18} color="#0284C7" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>Study 45 → 10 → 5</Text>
              <Text style={styles.insightSubtitle}>
                45m focused → 10m review → 5m break. Retention increases 2×.
              </Text>
            </View>
          </View>

          <View style={styles.insightCardPurple}>
            <View style={styles.insightIcon}>
              <MaterialCommunityIcons
                name="star-circle"
                size={18}
                color="#7C3AED"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>
                Always boost high-credit subjects
              </Text>
              <Text style={styles.insightSubtitle}>
                Improving 1 heavy credit course impacts CGPA more than 2 small
                ones.
              </Text>
            </View>
          </View>

          <View style={styles.insightCardGreen}>
            <View style={styles.insightIcon}>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={18}
                color="#22C55E"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.insightTitle}>Review on the same day</Text>
              <Text style={styles.insightSubtitle}>
                20 mins after class → 3× exam speed. Memory sticks instantly.
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>made with ❤️ by Satinder</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==================== STYLES ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // LOTTIE
  lottie: {
    width: 170,
    height: 170,
    alignSelf: "center",
    marginTop: 10,
  },

  // HEADER
  header: {
    marginBottom: 14,
    marginTop: 6,
  },
  appName: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },
  appDesc: {
    fontSize: 14,
    marginTop: 4,
    lineHeight: 19,
    color: "#6B7280",
  },

  // FEATURE CARD
  featureCard: {
    backgroundColor: "white",
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15.6,
    fontWeight: "600",
    color: "#1F2937",
  },
  cardSubtitle: {
    fontSize: 12.4,
    color: "#6B7280",
    marginTop: 2,
  },

  // TIP
  tipBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    padding: 14,
    backgroundColor: "#FFF7ED",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFD6A5",
    marginTop: 10,
  },
  tipIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#FFEAD4",
    justifyContent: "center",
    alignItems: "center",
  },
  tipTextWrapper: {
    flex: 1,
    minWidth: "80%",
  },
  tipTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#D97706",
    marginBottom: 2,
  },
  tipText: {
    fontSize: 12.6,
    color: "#B45309",
    lineHeight: 18,
    opacity: 0.95,
  },
  // Smart Insights Cards
  sectionBox: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16.5,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0F172A",
  },

  // Shared card base
  insightCardBase: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  insightCardBlue: {
    backgroundColor: "#E0F2FE",
    borderWidth: 1,
    borderColor: "#BAE6FD",
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },

  insightCardPurple: {
    backgroundColor: "#F3E8FF",
    borderWidth: 1,
    borderColor: "#E9D5FF",
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },

  insightCardGreen: {
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },

  insightIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
  },

  insightTitle: {
    fontSize: 14.3,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },

  insightSubtitle: {
    fontSize: 12.6,
    lineHeight: 17,
    color: "#4B5563",
  },

  // FOOTER
  footer: {
    textAlign: "center",
    fontSize: 13.6,
    paddingTop: 10,
    marginBottom: 10,
    color: "#9CA3AF",
  },
});
