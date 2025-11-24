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

export default function PercentageScreen() {
  const router = useRouter();

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

  // =============================
  // VALIDATION
  // =============================
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

    if (totalPossible === 0) {
      Alert.alert("Error", "Max total marks cannot be 0.");
      return;
    }

    const percent = (totalObtained / totalPossible) * 100;
    setPercentage(percent);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
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
          <Text style={styles.title}>📊 Percentage Calculator</Text>
          <Text style={styles.subtitle}>
            Enter your marks with maximum marks
          </Text>
        </View>

        {/* Subject Picker */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Number of subjects</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={subjectCount}
                onValueChange={(value) => handleSubjectChange(value)}
                style={styles.picker}
              >
                {[...Array(10).keys()].map((n) => (
                  <Picker.Item key={n + 1} label={`${n + 1}`} value={n + 1} />
                ))}
              </Picker>
            </View>
          </Card.Content>
        </Card>

        {/* Inputs List */}
        <Card style={styles.card}>
          <Card.Content>
            {marks.map((_, index) => (
              <View style={styles.row} key={index}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Marks"
                  value={marks[index]}
                  onChangeText={(t) => handleMarkChange(t, index, "score")}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Max"
                  value={maxMarks[index]}
                  onChangeText={(t) => handleMarkChange(t, index, "max")}
                />
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Calculate Button */}
        <Button
          mode="contained"
          style={styles.button}
          onPress={calculatePercentage}
        >
          Calculate Percentage
        </Button>

        {/* Result Card */}
        {percentage !== null && (
          <Card style={styles.resultCard}>
            <Card.Content>
              <Text style={styles.resultText}>{percentage.toFixed(2)}%</Text>
              <Text style={styles.resultSub}>Your overall percentage</Text>
            </Card.Content>
          </Card>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

// ============================================================
// Styles — untouched except minor tweaks
// ============================================================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fdfdfd" },
  container: { flexGrow: 1, padding: 20 },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: { fontSize: 15, fontWeight: "500", color: "#374151" },

  header: { alignItems: "center", marginBottom: 24 },
  title: { fontSize: 26, fontWeight: "700", color: "#212529" },
  subtitle: { fontSize: 14, color: "#6c757d", marginTop: 6 },

  card: {
    borderRadius: 18,
    marginBottom: 16,
    backgroundColor: "white",
    elevation: 3,
  },
  label: { fontSize: 15, fontWeight: "500", marginBottom: 8 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: { width: "100%" },

  row: { flexDirection: "row", gap: 10, marginBottom: 12 },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#fdfdfd",
  },

  button: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 8,
  },

  resultCard: {
    marginTop: 24,
    borderRadius: 18,
    backgroundColor: "#e7f5ff",
    elevation: 3,
    alignItems: "center",
  },
  resultText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0d6efd",
  },
  resultSub: { fontSize: 14, color: "#495057", marginTop: 4 },
});
