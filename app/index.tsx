import React from "react";
import { StyleSheet, View } from "react-native";
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
      <View style={styles.header}>
        <Text style={styles.title}>Course Calculator</Text>
        <Text style={styles.subtitle}>Quick tools for your academics</Text>
      </View>

      <Card
        style={[styles.card, { borderColor: "#007bff" }]}
        onPress={() => navigation.navigate("percentage")}
      >
        <Card.Content style={styles.cardContent}>
          <MaterialCommunityIcons name="percent" size={52} color="#007bff" />
          <Text style={styles.cardText}>Percentage Calculator</Text>
        </Card.Content>
      </Card>

      <Card
        style={[styles.card, { borderColor: "#6f42c1" }]}
        onPress={() => navigation.navigate("cgpa")}
      >
        <Card.Content style={styles.cardContent}>
          <MaterialCommunityIcons
            name="star-circle"
            size={52}
            color="#6f42c1"
          />
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
    backgroundColor: "#fdfdfd",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#212529",
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 6,
  },
  card: {
    width: "92%",
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 18,
    elevation: 6,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardContent: {
    alignItems: "center",
    padding: 28,
  },
  cardText: {
    marginTop: 14,
    fontSize: 19,
    fontWeight: "600",
    color: "#212529",
    textAlign: "center",
  },
  footer: {
    marginTop: "auto",
    marginBottom: 26,
    fontSize: 13,
    color: "#adb5bd",
  },
});
