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
        <Button
          mode="text"
          icon="arrow-left"
          onPress={() => router.back()}
          labelStyle={styles.backLabel}
          contentStyle={styles.backContent}
          style={styles.backButton}
        >
          Back
        </Button>

        <Text style={styles.title}>Semester-wise CGPA Calculator</Text>

        <Card style={styles.card}>
          <Text style={styles.label}>Select Number of Semesters:</Text>
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
        </Card>

        {semesters.map((sem, index) => (
          <Card key={index} style={styles.card}>
            <Text style={styles.subtitle}>Semester {index + 1}</Text>
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

        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={() => handleSemesterCountChange(semesterCount)}
            style={styles.button}
          >
            Generate
          </Button>
          <Button
            mode="contained"
            onPress={calculateCgpa}
            style={styles.button}
          >
            Calculate
          </Button>
        </View>

        {cgpa !== null && (
          <Card style={styles.resultCard}>
            <Text style={styles.result}>Final CGPA: {cgpa.toFixed(2)}</Text>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 12,
    alignSelf: "flex-start",
    borderRadius: 24,
    backgroundColor: "#F5F5F5",
  },
  backContent: {
    flexDirection: "row-reverse",
  },
  backLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1976D2",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: "#444",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: "#555",
  },

  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2, // subtle shadow
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: "#FAFAFA",
  },

  picker: {
    width: "100%",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
  },

  resultCard: {
    padding: 24,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#E3F2FD",
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976D2",
    textAlign: "center",
  },
});
