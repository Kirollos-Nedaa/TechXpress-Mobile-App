import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Helper functions for storing/reading tokens
export const saveToken = async (token) => {
  await SecureStore.setItemAsync("token", token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};

export const deleteToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
API.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
