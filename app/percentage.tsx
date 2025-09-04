import React, { useState } from "react";
import { StyleSheet, TextInput, ScrollView, View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
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

        <View style={styles.header}>
          <Text style={styles.title}>📊 Percentage Calculator</Text>
          <Text style={styles.subtitle}>
            Enter your marks to get instant results
          </Text>
        </View>

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

        <Card style={styles.card}>
          <Card.Content>
            {marks.map((mark, index) => (
              <TextInput
                key={index}
                style={styles.input}
                keyboardType="numeric"
                placeholder={`Marks for Subject ${index + 1}`}
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
          Calculate Percentage
        </Button>

        {percentage !== null && (
          <Card style={styles.resultCard}>
            <Card.Content>
              <Text style={styles.resultText}>{percentage.toFixed(2)}%</Text>
              <Text style={styles.resultSub}>Your overall percentage</Text>
            </Card.Content>
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
    flexGrow: 1,
    padding: 20,
  },
  // 🔙 Back button
  backButton: {
    borderRadius: 30,
    backgroundColor: "#f1f3f5",
    borderWidth: 0,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backContent: {
    flexDirection: "row-reverse", // Icon left, text right
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
    borderRadius: 18,
    marginBottom: 16,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
    color: "#343a40",
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
  input: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: "#fdfdfd",
  },
  // Calculate Button
  button: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 8,
  },
  // Result Card
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
    textAlign: "center",
  },
  resultSub: {
    fontSize: 14,
    color: "#495057",
    marginTop: 4,
    textAlign: "center",
  },
});
