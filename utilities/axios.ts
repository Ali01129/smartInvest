import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://54.162.155.99', // enter your serve ip address
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers['auth-token'] = token; // Set Authorization header if token exists
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
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
