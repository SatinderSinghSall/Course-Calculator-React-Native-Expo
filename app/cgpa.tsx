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
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        mode="outlined"
        onPress={() => router.back()}
        style={styles.backButton}
      >
        ⬅ Back
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
        <Button mode="contained" onPress={calculateCgpa} style={styles.button}>
          Calculate
        </Button>
      </View>

      {cgpa !== null && (
        <Card style={styles.resultCard}>
          <Text style={styles.result}>Final CGPA: {cgpa.toFixed(2)}</Text>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  backButton: {
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
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
  },
  resultCard: {
    padding: 24,
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976D2",
    textAlign: "center",
  },
});
