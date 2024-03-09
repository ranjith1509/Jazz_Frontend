import axios from "axios";
var axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_CORE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use((config) => {
  if (config.method === "post" && config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  const token = localStorage.getItem("auth");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        if (data.message === "Invalid token. Please log in again.") {
          localStorage.clear();
          window.location.replace("/login");
        }
        // Handle unauthorized error
        localStorage.clear();

        console.error("Unauthorized:", data);
      } else if (status === 404) {
        // Handle not found error
        console.error("Not Found:", data);
      } else if (status >= 400 && status < 500) {
        // Handle client-side errors
        console.error("Client Error:", data);
      } else if (status >= 500) {
        // Handle server-side errors
        console.error("Server Error:", data);
      }
    } else if (error.request) {
      // Handle request error
      console.error("Request Error:", error.request);
    } else {
      // Handle other errors
      console.error("Error:", error.message);
    }

    // Return a rejected promise with the error object
    return Promise.reject(error);
  }
);

export default axiosInstance;
