import axios from "axios";


// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use Vite/React environment variable
  timeout: 10000,
  withCredentials: true
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data?.message || error.message);

      if (error.response.status === 401) {
        console.warn("Unauthorized: Redirecting to login...");
        // window.location.href = "/login";
      }

      if (error.response.status === 404) {
        console.warn("Not Found:", error.response.config.url);
      }
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Axios Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
