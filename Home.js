import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "./services/authService";

const HomeScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        fetchCars();
      }
    };
    initialize();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Unauthorized", "Please log in.");
      navigation.replace("Login");
      return false;
    }
    return true;
  };

  const fetchCars = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://api-deployment-a687e991a39e.herokuapp.com/api/v1/cars",
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
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
        <FlatList
          data={cars}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Text>{`${item.year} ${item.make} ${item.model}`}</Text>
          )}
        />
      )}
      <Button
        title="Logout"
        onPress={() => {
          authService.logout();
          navigation.replace("Login");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default HomeScreen;
