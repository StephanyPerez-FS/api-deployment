import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE =
  "https://api-deployment-a687e991a39e.herokuapp.com/api/v1/auth";

export const signup = async (email, password) => {
  try {
    console.log("Sending Signup Request to:", `${API_BASE}/`);

    const response = await axios.post(`${API_BASE}/`, { email, password });

    console.log("Signup Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    console.log("Sending Login Request to:", `${API_BASE}/signin`);
    const response = await axios.post(
      `${API_BASE}/signin`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Login Successful:", response.data);
    await AsyncStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    console.log("Full Error:", error.response);
    throw error;
  }
};

export const logout = async () => {
  console.log("Logging out user...");
  await AsyncStorage.removeItem("token");
};

export default { signup, login, logout };
