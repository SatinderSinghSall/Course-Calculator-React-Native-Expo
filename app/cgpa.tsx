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

export default function CgpaScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

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
      Alert.alert("Error", "Please select number of semesters!");
      return false;
    }

    for (let i = 0; i < semesters.length; i++) {
      const { sgpa, credits } = semesters[i];

      if (!sgpa || !credits) {
        Alert.alert(
          "Missing Input",
          `Please enter SGPA and Credits for Semester ${i + 1}`
        );
        return false;
      }

      const s = parseFloat(sgpa);
      const c = parseFloat(credits);

      if (isNaN(s) || isNaN(c)) {
        Alert.alert(
          "Invalid Input",
          `Semester ${i + 1}: Only numeric values allowed`
        );
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
          "Invalid Credits",
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
              backgroundColor: isDark ? "#1e293b" : "#F3F4F6",
              borderColor: isDark ? "#334155" : "#E5E7EB",
            },
          ]}
          onPress={() => router.back()}
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
            🎓 CGPA Calculator
          </Text>
          <Text
            style={[styles.subtitle, { color: isDark ? "#9ca3af" : "#6c757d" }]}
          >
            Enter SGPA and credits for each semester
          </Text>
        </View>

        <Card
          style={[
            styles.card,
            { backgroundColor: isDark ? "#1e293b" : "#ffffff" },
          ]}
        >
          <Text
            style={[styles.label, { color: isDark ? "#e5e7eb" : "#343a40" }]}
          >
            Number of Semesters
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
              selectedValue={semesterCount}
              style={{ color: isDark ? "#e5e7eb" : "#212529" }}
              onValueChange={handleSemesterCountChange}
            >
              <Picker.Item label="-- Select --" value={0} />
              {Array.from({ length: 12 }, (_, i) => (
                <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
              ))}
            </Picker>
          </View>
        </Card>

        {semesters.map((sem, index) => (
          <Card
            key={index}
            style={[
              styles.card,
              { backgroundColor: isDark ? "#1e293b" : "#ffffff" },
            ]}
          >
            <Text style={styles.semTitle}>Semester {index + 1}</Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark ? "#020617" : "#fdfdfd",
                  borderColor: isDark ? "#334155" : "#dee2e6",
                  color: isDark ? "#e5e7eb" : "#212529",
                },
              ]}
              placeholder="SGPA"
              placeholderTextColor={isDark ? "#94a3b8" : "#6c757d"}
              keyboardType="numeric"
              value={sem.sgpa}
              onChangeText={(t) => updateSemester(index, "sgpa", t)}
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
              placeholder="Credits"
              placeholderTextColor={isDark ? "#94a3b8" : "#6c757d"}
              keyboardType="numeric"
              value={sem.credits}
              onChangeText={(t) => updateSemester(index, "credits", t)}
            />
          </Card>
        ))}

        <View style={styles.buttonRow}>
          <Button
            mode="outlined"
            style={styles.button}
            onPress={() => handleSemesterCountChange(semesterCount)}
          >
            Reset
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={calculateCgpa}
          >
            Calculate
          </Button>
        </View>

        {cgpa !== null && (
          <Card
            style={[
              styles.resultCard,
              { backgroundColor: isDark ? "#020617" : "#e7f5ff" },
            ]}
          >
            <Text style={styles.resultValue}>{cgpa}</Text>
            <Text
              style={[
                styles.resultLabel,
                { color: isDark ? "#9ca3af" : "#495057" },
              ]}
            >
              Final CGPA
            </Text>
          </Card>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flexGrow: 1, padding: 20, paddingBottom: 40 },

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
  subtitle: { fontSize: 14, marginTop: 6, textAlign: "center" },

  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    elevation: 2,
  },

  label: { fontSize: 15, fontWeight: "500", marginBottom: 8 },

  semTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6366f1",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 10,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 10,
  },
  button: { flex: 1, marginHorizontal: 4, borderRadius: 12 },

  resultCard: {
    padding: 26,
    borderRadius: 18,
    alignItems: "center",
  },
  resultValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#6366f1",
  },
  resultLabel: { fontSize: 14, marginTop: 4 },
});
