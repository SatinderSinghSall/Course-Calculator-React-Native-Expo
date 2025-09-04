import React, { useState } from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

export default function PercentageScreen() {
  const router = useRouter();
  const [subjectCount, setSubjectCount] = useState(2);
  const [marks, setMarks] = useState<string[]>(["", ""]);
  const [percentage, setPercentage] = useState<number | null>(null);

  const handleSubjectChange = (value: number) => {
    setSubjectCount(value);
    setMarks(Array(value).fill(""));
    setPercentage(null);
  };

  const handleMarkChange = (text: string, index: number) => {
    const updated = [...marks];
    updated[index] = text;
    setMarks(updated);
  };

  const calculatePercentage = () => {
    const numbers = marks.map((m) => parseFloat(m) || 0);
    const total = numbers.reduce((a, b) => a + b, 0);
    const percent = total / subjectCount;
    setPercentage(percent);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Percentage Calculator</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Select number of subjects:</Text>
          <Picker
            selectedValue={subjectCount}
            onValueChange={(value) => handleSubjectChange(value)}
            style={styles.picker}
          >
            {[...Array(10).keys()].map((n) => (
              <Picker.Item key={n + 1} label={`${n + 1}`} value={n + 1} />
            ))}
          </Picker>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          {marks.map((mark, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="numeric"
              placeholder={`Enter marks for Subject ${index + 1}`}
              value={mark}
              onChangeText={(text) => handleMarkChange(text, index)}
            />
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.button}
        onPress={calculatePercentage}
      >
        Calculate
      </Button>

      {percentage !== null && (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Text style={styles.resultText}>
              Percentage: {percentage.toFixed(2)}%
            </Text>
          </Card.Content>
        </Card>
      )}

      <Button
        mode="outlined"
        style={styles.backButton}
        onPress={() => router.back()}
      >
        ⬅ Back
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    padding: 20,
  },
  title: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#212529",
    color: "white",
    fontSize: 26,
    fontWeight: "600",
    paddingVertical: 20,
    marginBottom: 20,
  },
  card: {
    width: "100%",
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "white",
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    width: "100%",
    borderRadius: 12,
    paddingVertical: 6,
  },
  resultCard: {
    marginTop: 20,
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#e9f7ef",
    elevation: 3,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#198754",
    textAlign: "center",
  },
  backButton: {
    marginTop: 20,
    width: "100%",
    borderRadius: 12,
    paddingVertical: 6,
  },
});
