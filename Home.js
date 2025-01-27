import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ListContainer from "./components/ListContainer";

export default function HomeScreen({ navigation }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(
        "https://api-deployment-a687e991a39e.herokuapp.com/api/v1/cars"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCars(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car List</Text>
      {loading ? (
        <Text>Loading cars...</Text>
      ) : (
        <ListContainer
          data={cars}
          onPress={(id) =>
            navigation.navigate("Details", { id, refresh: fetchCars })
          }
        />
      )}
      <Button
        title="Add New Car"
        onPress={() => navigation.navigate("Details", { refresh: fetchCars })}
      />
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
});
