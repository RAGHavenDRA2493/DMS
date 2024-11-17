import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api", // Use env variables for flexibility
});

// Add token to Authorization header for all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Or sessionStorage for better security
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Handle 401 errors and other response issues
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("token"); // Clear token from storage
      window.location.href = "/login"; // Redirect to login
    } else {
      console.error("API error:", error.response ? error.response.data : error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
