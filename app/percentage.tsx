import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PercentageScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

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
    type: "score" | "max"
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
          `Subject ${i + 1}:
Marks cannot be negative.
Max marks must be > 0.`
        );
        return false;
      }

      if (o > m) {
        Alert.alert(
          "Incorrect entry",
          `Subject ${i + 1}:
Obtained marks (${o}) cannot exceed Max marks (${m}).`
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

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDark ? "#0f172a" : "#fdfdfd" },
      ]}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              backgroundColor: isDark ? "#1e293b" : "#F8F9FA",
              borderColor: isDark ? "#334155" : "#E5E7EB",
            },
          ]}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={20}
            color={isDark ? "#e5e7eb" : "#374151"}
          />
          <Text
            style={[
              styles.backButtonText,
              { color: isDark ? "#e5e7eb" : "#374151" },
            ]}
          >
            Back
          </Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text
            style={[styles.title, { color: isDark ? "#f8fafc" : "#212529" }]}
          >
            📊 Percentage Calculator
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6c757d" }]}
          >
            Enter your marks with maximum marks
          </Text>
        </View>

        <Card
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1e293b" : "#ffffff" },
          ]}
        >
          <Card.Content>
            <Text
              style={[styles.label, { color: isDark ? "#e5e7eb" : "#212529" }]}
            >
              Number of subjects
            </Text>
            <View
              style={[
                styles.pickerWrapper,
                {
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#dee2e6",
                },
              ]}
            >
              <Picker
                selectedValue={subjectCount}
                onValueChange={handleSubjectChange}
                style={{ color: isDark ? "#e5e7eb" : "#212529" }}
              >
                {[...Array(10).keys()].map((n) => (
                  <Picker.Item key={n + 1} label={`${n + 1}`} value={n + 1} />
                ))}
              </Picker>
            </View>
          </Card.Content>
        </Card>

        <Card
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1e293b" : "#ffffff" },
          ]}
        >
          <Card.Content>
            {marks.map((_, index) => (
              <View style={styles.row} key={index}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDark ? "#020617" : "#fdfdfd",
                      borderColor: isDark ? "#334155" : "#dee2e6",
                      color: isDark ? "#e5e7eb" : "#212529",
                    },
                  ]}
                  keyboardType="numeric"
                  placeholder="Marks"
                  placeholderTextColor={isDark ? "#94a3b8" : "#6c757d"}
                  value={marks[index]}
                  onChangeText={(t) => handleMarkChange(t, index, "score")}
                />
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDark ? "#020617" : "#fdfdfd",
                      borderColor: isDark ? "#334155" : "#dee2e6",
                      color: isDark ? "#e5e7eb" : "#212529",
                    },
                  ]}
                  keyboardType="numeric"
                  placeholder="Max"
                  placeholderTextColor={isDark ? "#94a3b8" : "#6c757d"}
                  value={maxMarks[index]}
                  onChangeText={(t) => handleMarkChange(t, index, "max")}
                />
              </View>
            ))}
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          style={styles.button}
          onPress={calculatePercentage}
        >
          Calculate Percentage
        </Button>

        {percentage !== null && (
          <Card
            style={[
              styles.resultCard,
              { backgroundColor: isDark ? "#020617" : "#e7f5ff" },
            ]}
          >
            <Card.Content>
              <Text style={styles.resultText}>{percentage.toFixed(2)}%</Text>
              <Text
                style={[
                  styles.resultSub,
                  { color: isDark ? "#9ca3af" : "#495057" },
                ]}
              >
                Your overall percentage
              </Text>
            </Card.Content>
          </Card>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flexGrow: 1, padding: 20 },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: { fontSize: 15, fontWeight: "500" },

  header: { alignItems: "center", marginBottom: 24 },
  title: { fontSize: 26, fontWeight: "700" },
  subtitle: { fontSize: 14, marginTop: 6 },

  card: {
    borderRadius: 18,
    marginBottom: 16,
    elevation: 3,
  },

  label: { fontSize: 15, fontWeight: "500", marginBottom: 8 },

  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },

  row: { flexDirection: "row", gap: 10, marginBottom: 12 },

  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },

  button: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 8,
  },

  resultCard: {
    marginTop: 24,
    borderRadius: 18,
    elevation: 3,
    alignItems: "center",
  },
  resultText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#6366f1",
  },
  resultSub: { fontSize: 14, marginTop: 4 },
});
