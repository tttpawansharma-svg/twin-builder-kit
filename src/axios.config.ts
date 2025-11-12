// src/axios.config.ts
import axios from 'axios';

// Base URL for all API calls
// Priority: Environment variable > Production URL
const BASE_URL = 'https://api.digitaltwin.techtrekkers.ai/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds auth token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Export base URL for non-axios usage (like fetch or image URLs)
export const API_BASE_URL = BASE_URL;
export const IMAGE_BASE_URL = 'https://api.digitaltwin.techtrekkers.ai';

// Log the current configuration (only in development)
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    baseURL: BASE_URL,
    imageBaseURL: IMAGE_BASE_URL,
  });
}