import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      toast.error('Something went wrong. Please login again.');
    }
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !(originalRequest && originalRequest.url && originalRequest.url.includes('/admin/login'))
    ) {
      localStorage.removeItem('jwtToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;