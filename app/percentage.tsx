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
  primary: "#0D6EFD",
  heroBg: "#EEF2FF",
  successBg: "#DCFCE7",
  successBorder: "#BBF7D0",
};

const darkColors = {
  background: "#0B1220",
  card: "#111827",
  textPrimary: "#E5E7EB",
  textSecondary: "#9CA3AF",
  iconBg: "#1F2937",
  border: "rgba(255,255,255,0.08)",
  primary: "#3B82F6",
  heroBg: "#0F172A",
  successBg: "#0F2417",
  successBorder: "#1E4D2B",
};

export default function PercentageScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? darkColors : lightColors;

  const [subjectCount, setSubjectCount] = useState(2);
  const [marks, setMarks] = useState<string[]>(["", ""]);
  const [maxMarks, setMaxMarks] = useState<string[]>(["", ""]);
  const [percentage, setPercentage] = useState<number | null>(null);

  const handleSubjectChange = (value: number) => {
    setSubjectCount(value);
    setMarks(Array(value).fill(""));
    setMaxMarks(Array(value).fill(""));
    setPercentage(null);
  };

  const handleMarkChange = (
    text: string,
    index: number,
    type: "score" | "max",
  ) => {
    const cleaned = text.replace(/\s+/g, "");

    if (type === "score") {
      const updated = [...marks];
      updated[index] = cleaned;
      setMarks(updated);
    } else {
      const updated = [...maxMarks];
      updated[index] = cleaned;
      setMaxMarks(updated);
    }
  };

  const validateInputs = () => {
    for (let i = 0; i < subjectCount; i++) {
      const obtained = marks[i];
      const total = maxMarks[i];

      if (obtained === "" || total === "") {
        Alert.alert("Missing values", `Please fill Subject ${i + 1}`);
        return false;
      }

      if (isNaN(Number(obtained)) || isNaN(Number(total))) {
        Alert.alert("Invalid input", `Subject ${i + 1}: Enter only numbers.`);
        return false;
      }

      const o = parseFloat(obtained);
      const m = parseFloat(total);

      if (o < 0 || m <= 0) {
        Alert.alert(
          "Invalid marks",
          `Subject ${i + 1}:\nMarks cannot be negative.\nMax marks must be > 0.`,
        );
        return false;
      }

      if (o > m) {
        Alert.alert(
          "Incorrect entry",
          `Subject ${i + 1}:\nObtained marks (${o}) cannot exceed Max marks (${m}).`,
        );
        return false;
      }
    }
    return true;
  };

  const calculatePercentage = () => {
    if (!validateInputs()) return;

    const obtained = marks.map((m) => parseFloat(m));
    const totalMax = maxMarks.map((m) => parseFloat(m));

    const totalObtained = obtained.reduce((a, b) => a + b, 0);
    const totalPossible = totalMax.reduce((a, b) => a + b, 0);

    const percent = (totalObtained / totalPossible) * 100;
    setPercentage(percent);
  };

  const totals = useMemo(() => {
    const totalObtained = marks.reduce((sum, v) => sum + (Number(v) || 0), 0);
    const totalPossible = maxMarks.reduce(
      (sum, v) => sum + (Number(v) || 0),
      0,
    );
    return { totalObtained, totalPossible };
  }, [marks, maxMarks]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* TOP BAR (SaaS) */}
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
              Percentage
            </Text>
            <Text style={[styles.topSub, { color: colors.textSecondary }]}>
              Quick marks → percentage calculator
            </Text>
          </View>

          <View style={[styles.topIcon, { backgroundColor: colors.iconBg }]}>
            <MaterialCommunityIcons
              name="percent"
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
            Calculate instantly. ⚡
          </Text>

          <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>
            Add your subject marks and max marks. We’ll generate a clean overall
            percentage.
          </Text>

          <View style={styles.heroStatsRow}>
            <View style={[styles.heroStat, { borderColor: colors.border }]}>
              <Text
                style={[styles.heroStatValue, { color: colors.textPrimary }]}
              >
                {subjectCount}
              </Text>
              <Text
                style={[styles.heroStatLabel, { color: colors.textSecondary }]}
              >
                Subjects
              </Text>
            </View>

            <View style={[styles.heroStat, { borderColor: colors.border }]}>
              <Text
                style={[styles.heroStatValue, { color: colors.textPrimary }]}
              >
                {totals.totalObtained}
              </Text>
              <Text
                style={[styles.heroStatLabel, { color: colors.textSecondary }]}
              >
                Total Marks
              </Text>
            </View>

            <View style={[styles.heroStat, { borderColor: colors.border }]}>
              <Text
                style={[styles.heroStatValue, { color: colors.textPrimary }]}
              >
                {totals.totalPossible}
              </Text>
              <Text
                style={[styles.heroStatLabel, { color: colors.textSecondary }]}
              >
                Max Marks
              </Text>
            </View>
          </View>
        </View>

        {/* SUBJECT COUNT */}
        <Card
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
              Setup
            </Text>
            <Text style={[styles.cardHint, { color: colors.textSecondary }]}>
              Choose number of subjects
            </Text>
          </View>

          <View
            style={[
              styles.pickerWrapper,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Picker
              selectedValue={subjectCount}
              onValueChange={handleSubjectChange}
              style={{ color: colors.textPrimary }}
            >
              {[...Array(10).keys()].map((n) => (
                <Picker.Item key={n + 1} label={`${n + 1}`} value={n + 1} />
              ))}
            </Picker>
          </View>
        </Card>

        {/* INPUTS */}
        <Card
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
              Enter marks
            </Text>
            <Text style={[styles.cardHint, { color: colors.textSecondary }]}>
              Fill marks for each subject
            </Text>
          </View>

          {marks.map((_, index) => (
            <View key={index} style={styles.subjectBlock}>
              <View style={styles.subjectRowTop}>
                <Text
                  style={[styles.subjectTitle, { color: colors.textPrimary }]}
                >
                  Subject {index + 1}
                </Text>
              </View>

              <View style={styles.row}>
                <View style={styles.inputWrap}>
                  <Text
                    style={[styles.inputLabel, { color: colors.textSecondary }]}
                  >
                    Marks
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
                    keyboardType="numeric"
                    placeholder="e.g. 78"
                    placeholderTextColor={colors.textSecondary}
                    value={marks[index]}
                    onChangeText={(t) => handleMarkChange(t, index, "score")}
                  />
                </View>

                <View style={styles.inputWrap}>
                  <Text
                    style={[styles.inputLabel, { color: colors.textSecondary }]}
                  >
                    Max
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
                    keyboardType="numeric"
                    placeholder="e.g. 100"
                    placeholderTextColor={colors.textSecondary}
                    value={maxMarks[index]}
                    onChangeText={(t) => handleMarkChange(t, index, "max")}
                  />
                </View>
              </View>
            </View>
          ))}
        </Card>

        {/* CTA */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.ctaBtn, { backgroundColor: colors.primary }]}
          onPress={calculatePercentage}
        >
          <MaterialCommunityIcons name="calculator" size={20} color="#fff" />
          <Text style={styles.ctaText}>Calculate Percentage</Text>
        </TouchableOpacity>

        {/* RESULT */}
        {percentage !== null && (
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
              <View
                style={[
                  styles.resultIcon,
                  { backgroundColor: "rgba(255,255,255,0.4)" },
                ]}
              >
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={20}
                  color={scheme === "dark" ? "#86EFAC" : "#16A34A"}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.resultTitle, { color: colors.textPrimary }]}
                >
                  Your Percentage
                </Text>
                <Text
                  style={[styles.resultSub, { color: colors.textSecondary }]}
                >
                  Based on your entered marks
                </Text>
              </View>
            </View>

            <Text style={[styles.resultValue, { color: colors.textPrimary }]}>
              {percentage.toFixed(2)}%
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
  topTitle: { fontSize: 18, fontWeight: "800" },
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

  /* SUBJECT INPUT */
  subjectBlock: {
    paddingTop: 6,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(150,150,150,0.12)",
  },
  subjectRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subjectTitle: { fontSize: 13.8, fontWeight: "800" },

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
  ctaBtn: {
    marginTop: 6,
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  ctaText: { color: "#fff", fontWeight: "900", fontSize: 14.5 },

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
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
