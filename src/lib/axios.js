import axios from 'axios';

// Configure Axios base URL (optional but recommended)
// axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Assuming you have a VITE_API_URL in your .env file

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('jwtToken'); // Assuming the token is stored with this key

    // If the token exists and the request is to your backend API
    // You might want to add a check here to only add the token for specific routes or domains
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// You can export the configured axios instance if needed, but configuring the default instance is also common
// export default axios; 