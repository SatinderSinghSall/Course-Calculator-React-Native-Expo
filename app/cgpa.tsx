import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const lightColors = {
  background: "#F5F7FB",
  card: "#FFFFFF",
  textPrimary: "#0F172A",
  textSecondary: "#6B7280",
  iconBg: "#F3F4F6",
  border: "rgba(15, 23, 42, 0.08)",

  primary: "#6F42C1",
  heroBg: "#F3E8FF",

  successBg: "#DCFCE7",
  successBorder: "#BBF7D0",

  dangerBg: "#FFE4E6",
  dangerBorder: "#FECDD3",
};

const darkColors = {
  background: "#0B1220",
  card: "#111827",
  textPrimary: "#E5E7EB",
  textSecondary: "#9CA3AF",
  iconBg: "#1F2937",
  border: "rgba(255,255,255,0.08)",

  primary: "#A78BFA",
  heroBg: "#1B102D",

  successBg: "#0F2417",
  successBorder: "#1E4D2B",

  dangerBg: "#2A0D14",
  dangerBorder: "#7F1D1D",
};

export default function CgpaScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? darkColors : lightColors;

  const [semesterCount, setSemesterCount] = useState(0);
  const [semesters, setSemesters] = useState<
    { sgpa: string; credits: string }[]
  >([]);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const handleSemesterCountChange = (count: number) => {
    setSemesterCount(count);
    setCgpa(null);
    setSemesters(
      Array.from({ length: count }, () => ({ sgpa: "", credits: "" }))
    );
  };

  const updateSemester = (
    index: number,
    field: "sgpa" | "credits",
    value: string
  ) => {
    const clean = value.replace(/\s+/g, "");
    setSemesters((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: clean };
      return updated;
    });
  };

  const validateInputs = () => {
    if (semesterCount === 0) {
      Alert.alert("Missing setup", "Please select number of semesters!");
      return false;
    }

    for (let i = 0; i < semesters.length; i++) {
      const { sgpa, credits } = semesters[i];

      if (!sgpa || !credits) {
        Alert.alert(
          "Missing input",
          `Please enter SGPA and Credits for Semester ${i + 1}`
        );
        return false;
      }

      const s = parseFloat(sgpa);
      const c = parseFloat(credits);

      if (isNaN(s) || isNaN(c)) {
        Alert.alert("Invalid input", `Semester ${i + 1}: Enter numbers only`);
        return false;
      }

      if (s < 0 || s > 10) {
        Alert.alert(
          "Invalid SGPA",
          `Semester ${i + 1}: SGPA must be between 0 and 10`
        );
        return false;
      }

      if (c <= 0) {
        Alert.alert(
          "Invalid credits",
          `Semester ${i + 1}: Credits must be greater than 0`
        );
        return false;
      }
    }

    return true;
  };

  const calculateCgpa = () => {
    if (!validateInputs()) return;

    let totalWeighted = 0;
    let totalCredits = 0;

    semesters.forEach(({ sgpa, credits }) => {
      const s = parseFloat(sgpa);
      const c = parseFloat(credits);
      totalWeighted += s * c;
      totalCredits += c;
    });

    const val = totalWeighted / totalCredits;
    setCgpa(Number(val.toFixed(2)));
  };

  const resetForm = () => {
    handleSemesterCountChange(semesterCount);
    setCgpa(null);
  };

  const totals = useMemo(() => {
    const totalCredits = semesters.reduce(
      (sum, sem) => sum + (Number(sem.credits) || 0),
      0
    );

    const avgSgpa =
      semesters.length === 0
        ? 0
        : semesters.reduce((sum, sem) => sum + (Number(sem.sgpa) || 0), 0) /
          semesters.length;

    return {
      totalCredits,
      avgSgpa: Number(avgSgpa.toFixed(2)),
    };
  }, [semesters]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={[styles.backBtn, { borderColor: colors.border }]}
            onPress={() => router.back()}
            activeOpacity={0.75}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={20}
              color={colors.textPrimary}
            />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={[styles.topTitle, { color: colors.textPrimary }]}>
              CGPA
            </Text>
            <Text style={[styles.topSub, { color: colors.textSecondary }]}>
              Semester-wise weighted calculator
            </Text>
          </View>

          <View style={[styles.topIcon, { backgroundColor: colors.iconBg }]}>
            <MaterialCommunityIcons
              name="star-circle"
              size={20}
              color={colors.primary}
            />
          </View>
        </View>

        {/* HERO SUMMARY */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: colors.heroBg, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>
            Weighted CGPA Calculator. ⭐
          </Text>

          <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>
            Enter SGPA + Credits for each semester. CGPA will be calculated using
            credit-weighted average.
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={[styles.heroStat, { borderColor: colors.border }]}>
              <Text style={[styles.heroStatValue, { color: colors.textPrimary }]}>
                {semesterCount}
              </Text>
              <Text style={[styles.heroStatLabel, { color: colors.textSecondary }]}>
                Semesters
              </Text>
            </View>

            <View style={[styles.heroStat, { borderColor: colors.border }]}>
              <Text style={[styles.heroStatValue, { color: colors.textPrimary }]}>
                {totals.totalCredits}
              </Text>
              <Text style={[styles.heroStatLabel, { color: colors.textSecondary }]}>
                Credits
              </Text>
            </View>

            <View style={[styles.heroStat, { borderColor: colors.border }]}>
              <Text style={[styles.heroStatValue, { color: colors.textPrimary }]}>
                {totals.avgSgpa}
              </Text>
              <Text style={[styles.heroStatLabel, { color: colors.textSecondary }]}>
                Avg SGPA
              </Text>
            </View>
          </View>
        </View>

        {/* SETUP */}
        <Card style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
              Setup
            </Text>
            <Text style={[styles.cardHint, { color: colors.textSecondary }]}>
              Select how many semesters you want to calculate
            </Text>
          </View>

          <View
            style={[
              styles.pickerWrapper,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Picker
              selectedValue={semesterCount}
              style={{ color: colors.textPrimary }}
              onValueChange={handleSemesterCountChange}
            >
              <Picker.Item label="-- Select --" value={0} />
              {Array.from({ length: 12 }, (_, i) => (
                <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
              ))}
            </Picker>
          </View>
        </Card>

        {/* SEMESTER INPUTS */}
        {semesters.length > 0 && (
          <Card style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                Enter semester details
              </Text>
              <Text style={[styles.cardHint, { color: colors.textSecondary }]}>
                SGPA (0-10) and Credits (>0)
              </Text>
            </View>

            {semesters.map((sem, index) => (
              <View key={index} style={styles.semBlock}>
                <View style={styles.semHeaderRow}>
                  <Text style={[styles.semTitle, { color: colors.textPrimary }]}>
                    Semester {index + 1}
                  </Text>
                </View>

                <View style={styles.row}>
                  <View style={styles.inputWrap}>
                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                      SGPA
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor:
                            scheme === "dark" ? "#0B1220" : "#F8FAFC",
                          borderColor: colors.border,
                          color: colors.textPrimary,
                        },
                      ]}
                      placeholder="e.g. 8.4"
                      placeholderTextColor={colors.textSecondary}
                      keyboardType="numeric"
                      value={sem.sgpa}
                      onChangeText={(t) => updateSemester(index, "sgpa", t)}
                    />
                  </View>

                  <View style={styles.inputWrap}>
                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                      Credits
                    </Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor:
                            scheme === "dark" ? "#0B1220" : "#F8FAFC",
                          borderColor: colors.border,
                          color: colors.textPrimary,
                        },
                      ]}
                      placeholder="e.g. 24"
                      placeholderTextColor={colors.textSecondary}
                      keyboardType="numeric"
                      value={sem.credits}
                      onChangeText={(t) => updateSemester(index, "credits", t)}
                    />
                  </View>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* CTA BUTTONS */}
        <View style={styles.ctaRow}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.secondaryBtn,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={resetForm}
          >
            <MaterialCommunityIcons
              name="refresh"
              size={20}
              color={colors.textPrimary}
            />
            <Text style={[styles.secondaryBtnText, { color: colors.textPrimary }]}>
              Reset
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={calculateCgpa}
          >
            <MaterialCommunityIcons name="calculator" size={20} color="#fff" />
            <Text style={styles.primaryBtnText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {/* RESULT */}
        {cgpa !== null && (
          <View
            style={[
              styles.resultCard,
              {
                backgroundColor: colors.successBg,
                borderColor: colors.successBorder,
              },
            ]}
          >
            <View style={styles.resultTopRow}>
              <View style={[styles.resultIcon, { backgroundColor: "rgba(255,255,255,0.4)" }]}>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={20}
                  color={scheme === "dark" ? "#86EFAC" : "#16A34A"}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[styles.resultTitle, { color: colors.textPrimary }]}>
                  Final CGPA
                </Text>
                <Text style={[styles.resultSub, { color: colors.textSecondary }]}>
                  Credit-weighted average
                </Text>
              </View>
            </View>

            <Text style={[styles.resultValue, { color: colors.textPrimary }]}>
              {cgpa}
            </Text>
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flexGrow: 1, paddingHorizontal: 18, paddingBottom: 28 },

  /* TOP BAR */
  topBar: {
    marginTop: 6,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topTitle: { fontSize: 18, fontWeight: "900" },
  topSub: { fontSize: 12.6, marginTop: 2, opacity: 0.85 },
  topIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  /* HERO */
  heroCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
  },
  heroTitle: { fontSize: 16.5, fontWeight: "900" },
  heroDesc: { fontSize: 12.8, marginTop: 6, lineHeight: 17.5, opacity: 0.9 },

  heroStatsRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
  },
  heroStat: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  heroStatValue: { fontSize: 15.5, fontWeight: "900" },
  heroStatLabel: { fontSize: 12, marginTop: 2 },

  /* CARDS */
  card: {
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    padding: 14,
  },
  cardHeader: { marginBottom: 10 },
  cardTitle: { fontSize: 15.5, fontWeight: "900" },
  cardHint: { fontSize: 12.4, marginTop: 2, opacity: 0.85 },

  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
  },

  /* SEMESTERS */
  semBlock: {
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(150,150,150,0.12)",
  },
  semHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  semTitle: { fontSize: 13.8, fontWeight: "900" },

  row: { flexDirection: "row", gap: 10 },
  inputWrap: { flex: 1 },

  inputLabel: { fontSize: 12.2, marginBottom: 6, opacity: 0.9 },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14.5,
  },

  /* CTA */
  ctaRow: {
    marginTop: 6,
    flexDirection: "row",
    gap: 10,
  },

  secondaryBtn: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  secondaryBtnText: { fontWeight: "900", fontSize: 14.2 },

  primaryBtn: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  primaryBtnText: { color: "#fff", fontWeight: "900", fontSize: 14.2 },

  /* RESULT */
  resultCard: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
  },
  resultTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  resultIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  resultTitle: { fontSize: 14.2, fontWeight: "900" },
  resultSub: { fontSize: 12.2, marginTop: 2, opacity: 0.85 },

  resultValue: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
