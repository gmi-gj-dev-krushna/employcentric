
import axios from 'axios';

// API base URL
const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance with defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
