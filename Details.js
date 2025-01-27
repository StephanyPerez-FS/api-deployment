import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function DetailsScreen({ route, navigation }) {
  const { id } = route.params || {}; // `id` will be undefined if adding a new car
  const [car, setCar] = useState({ year: "", make: "", model: "" });
  const [loading, setLoading] = useState(!!id); // Loading is true if editing an existing car

  useEffect(() => {
    if (id) {
      fetch(
        `https://api-deployment-a687e991a39e.herokuapp.com/api/v1/cars/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCar(data);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching car details:", error));
    }
  }, [id]);

  const handleSave = async () => {
    const method = id ? "PATCH" : "POST";
    const url = id
      ? `https://api-deployment-a687e991a39e.herokuapp.com/api/v1/cars/${id}`
      : `https://api-deployment-a687e991a39e.herokuapp.com/api/v1/cars`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      });
      if (route.params?.refresh) {
        route.params.refresh(); // Trigger the re-fetch on HomeScreen
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `https://api-deployment-a687e991a39e.herokuapp.com/api/v1/cars/${id}`,
        {
          method: "DELETE",
        }
      );
      if (route.params?.refresh) {
        route.params.refresh(); // Trigger the re-fetch on HomeScreen
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id ? "Edit Car" : "Add Car"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={car.year}
        onChangeText={(text) => setCar({ ...car, year: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Make"
        value={car.make}
        onChangeText={(text) => setCar({ ...car, make: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={car.model}
        onChangeText={(text) => setCar({ ...car, model: text })}
      />
      <Button title="Save" onPress={handleSave} />
      {id && <Button title="Delete" onPress={handleDelete} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
