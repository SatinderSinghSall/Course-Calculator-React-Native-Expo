import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <Text style={styles.title}>Course Calculator</Text>

      <Card
        style={[styles.card, { borderColor: "#007bff" }]}
        onPress={() => navigation.navigate("percentage")}
      >
        <Card.Content style={styles.cardContent}>
          <MaterialCommunityIcons name="percent" size={48} color="#007bff" />
          <Text style={styles.cardText}>Percentage Calculator</Text>
        </Card.Content>
      </Card>

      <Card
        style={[styles.card, { borderColor: "#6f42c1" }]}
        onPress={() => navigation.navigate("cgpa")}
      >
        <Card.Content style={styles.cardContent}>
          <MaterialCommunityIcons name="star" size={48} color="#6f42c1" />
          <Text style={styles.cardText}>CGPA Calculator</Text>
        </Card.Content>
      </Card>

      <Text style={styles.footer}>Developed with ❤️ by Satinder</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#212529",
    color: "white",
    fontSize: 28,
    fontWeight: "600",
    paddingVertical: 24,
    marginBottom: 24,
  },
  card: {
    width: "90%",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 4,
    backgroundColor: "white",
  },
  cardContent: {
    alignItems: "center",
    padding: 20,
  },
  cardText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "500",
    color: "#212529",
    textAlign: "center",
  },
  footer: {
    marginTop: "auto",
    marginBottom: 24,
    fontSize: 13,
    color: "#6c757d",
  },
});
