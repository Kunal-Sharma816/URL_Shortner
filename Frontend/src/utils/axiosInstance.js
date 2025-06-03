import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout:10000,
  withCredentials:true
});



// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Just return the response if OK
  (error) => {
    // Global error handler
    if (error.response) { 
      console.error("API Error:", error.response.data?.message || error.message);

      // Example: Handle common error status codes
      if (error.response.status === 401) {
        console.warn("Unauthorized: Redirecting to login...");
        // window.location.href = "/login"; // Optionally redirect
      }

      if (error.response.status === 404) {
        console.warn("Not Found:", error.response.config.url);
      }
    } else if (error.request) {
      console.error(" No response received from server.");
    } else {
      console.error(" Axios Error:", error.message);
    }

    return Promise.reject(error); // Let individual calls still handle if needed
  }
);

export default axiosInstance;
