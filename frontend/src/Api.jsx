import axios from "axios";

// Get the base URL from the .env file
const baseURL = import.meta.env.VITE_BASE_URL;

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL,
});

// Add a request interceptor to add authorization headers for access tokens
api.interceptors.request.use(
  (config) => {
    // Get the access token from localStorage
    const token = localStorage.getItem("access_token");

    // Add the access token to the request headers if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
