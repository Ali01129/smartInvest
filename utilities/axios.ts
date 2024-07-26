import { RootState } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector, UseSelector } from "react-redux";

const axiosInstance = axios.create({
  baseURL: "http://192.168.7.121:5000", // enter your laptop ip address and port number
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token"); 

    if (token) {
      config.headers["auth-token"] = token; // Set Authorization header if token exists
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
