import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CgpaScreen() {
  const router = useRouter();
  const [semesterCount, setSemesterCount] = useState(0);
  const [semesters, setSemesters] = useState<
    { sgpa: string; credits: string }[]
  >([]);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const handleSemesterCountChange = (count: number) => {
    setSemesterCount(count);
    setSemesters(Array(count).fill({ sgpa: "", credits: "" }));
    setCgpa(null);
  };

  const updateSemester = (
    index: number,
    field: "sgpa" | "credits",
    value: string
  ) => {
    const updated = [...semesters];
    updated[index] = { ...updated[index], [field]: value };
    setSemesters(updated);
  };

  const calculateCgpa = () => {
    if (semesters.length === 0) {
      Alert.alert("Error", "Please generate semester fields first!");
      return;
    }

    let totalWeighted = 0;
    let totalCredits = 0;

    for (let i = 0; i < semesters.length; i++) {
      const sgpa = parseFloat(semesters[i].sgpa);
      const credits = parseFloat(semesters[i].credits);

      if (isNaN(sgpa) || isNaN(credits)) {
        Alert.alert("Error", `Enter SGPA & Credits for Semester ${i + 1}`);
        return;
      }

      totalWeighted += sgpa * credits;
      totalCredits += credits;
    }

    if (totalCredits === 0) {
      Alert.alert("Error", "Credits cannot be zero!");
      return;
    }

    setCgpa(totalWeighted / totalCredits);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back Button */}
        <Button
          mode="outlined"
          style={styles.backButton}
          onPress={() => router.back()}
          contentStyle={styles.backContent}
          labelStyle={styles.backLabel}
          icon={() => (
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color="#495057"
            />
          )}
        >
          Back
        </Button>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎓 CGPA Calculator</Text>
          <Text style={styles.subtitle}>
            Enter your SGPA & credits for each semester
          </Text>
        </View>

        {/* Semester Picker */}
        <Card style={styles.card}>
          <Text style={styles.label}>Select number of semesters</Text>
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
            <Text style={styles.semesterTitle}>Semester {index + 1}</Text>
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
            onPress={() => handleSemesterCountChange(semesterCount)}
            style={[styles.button, styles.generateButton]}
          >
            Generate
          </Button>
          <Button
            mode="contained"
            onPress={calculateCgpa}
            style={[styles.button, styles.calculateButton]}
          >
            Calculate
          </Button>
        </View>

        {/* Result */}
        {cgpa !== null && (
          <Card style={styles.resultCard}>
            <Text style={styles.resultValue}>{cgpa.toFixed(2)}</Text>
            <Text style={styles.resultLabel}>Final CGPA</Text>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  // 🔙 Back Button
  backButton: {
    borderRadius: 30,
    backgroundColor: "#f1f3f5",
    borderWidth: 0,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backContent: {
    flexDirection: "row-reverse",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  backLabel: {
    fontSize: 15,
    color: "#495057",
    marginLeft: 4,
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#212529",
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 6,
    textAlign: "center",
  },

  // Cards
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#343a40",
  },
  semesterTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "600",
    color: "#0d6efd",
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: "#fdfdfd",
  },

  // Picker
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },

  // Buttons
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    paddingVertical: 6,
  },
  generateButton: {
    borderColor: "#0d6efd",
  },
  calculateButton: {
    backgroundColor: "#0d6efd",
  },

  // Result
  resultCard: {
    padding: 28,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: "#e7f5ff",
    alignItems: "center",
  },
  resultValue: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0d6efd",
  },
  resultLabel: {
    fontSize: 14,
    color: "#495057",
    marginTop: 4,
  },
});
