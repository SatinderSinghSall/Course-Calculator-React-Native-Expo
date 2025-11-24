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
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CgpaScreen() {
  const router = useRouter();

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

  // =============================
  // VALIDATIONS 🚨
  // =============================
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

    if (totalCredits === 0) {
      Alert.alert("Error", "Credits cannot be zero");
      return;
    }

    const val = totalWeighted / totalCredits;
    setCgpa(Number(val.toFixed(2)));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={20}
            color="#374151"
          />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎓 CGPA Calculator</Text>
          <Text style={styles.subtitle}>
            Enter SGPA and credits for each semester
          </Text>
        </View>

        {/* Semester Picker */}
        <Card style={styles.card}>
          <Text style={styles.label}>Number of Semesters</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={semesterCount}
              style={styles.picker}
              onValueChange={(val) => handleSemesterCountChange(val)}
            >
              <Picker.Item label="-- Select --" value={0} />
              {Array.from({ length: 12 }, (_, i) => (
                <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
              ))}
            </Picker>
          </View>
        </Card>

        {/* Semester Inputs */}
        {semesters.map((sem, index) => (
          <Card key={index} style={styles.card}>
            <Text style={styles.semTitle}>Semester {index + 1}</Text>

            <TextInput
              style={styles.input}
              placeholder="SGPA"
              keyboardType="numeric"
              value={sem.sgpa}
              onChangeText={(t) => updateSemester(index, "sgpa", t)}
            />

            <TextInput
              style={styles.input}
              placeholder="Credits"
              keyboardType="numeric"
              value={sem.credits}
              onChangeText={(t) => updateSemester(index, "credits", t)}
            />
          </Card>
        ))}

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Button
            mode="outlined"
            style={[styles.button, styles.generateButton]}
            onPress={() => handleSemesterCountChange(semesterCount)}
          >
            Reset
          </Button>

          <Button
            mode="contained"
            style={[styles.button, styles.calculateButton]}
            onPress={calculateCgpa}
          >
            Calculate
          </Button>
        </View>

        {cgpa !== null && (
          <Card style={styles.resultCard}>
            <Text style={styles.resultValue}>{cgpa}</Text>
            <Text style={styles.resultLabel}>Final CGPA</Text>
          </Card>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fdfdfd" },
  container: { flexGrow: 1, padding: 20, paddingBottom: 40 },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
  },

  header: { alignItems: "center", marginBottom: 24 },
  title: { fontSize: 26, fontWeight: "700", color: "#212529" },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 6,
    textAlign: "center",
  },

  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "white",
    elevation: 2,
  },

  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
    color: "#343a40",
  },

  semTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0d6efd",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: "#fdfdfd",
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 10,
  },
  button: { flex: 1, marginHorizontal: 4, borderRadius: 12 },
  generateButton: { borderColor: "#0d6efd" },
  calculateButton: { backgroundColor: "#0d6efd" },

  resultCard: {
    padding: 26,
    borderRadius: 18,
    backgroundColor: "#e7f5ff",
    alignItems: "center",
  },
  resultValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0d6efd",
  },
  resultLabel: {
    fontSize: 14,
    color: "#495057",
    marginTop: 4,
  },
});
