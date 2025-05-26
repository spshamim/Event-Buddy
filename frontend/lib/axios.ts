import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Creating axios instance with default config
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized, so user can't access protected routes
            if (error.response.status === 401) {
                // Clear auth data
                Cookies.remove("access_token");
                Cookies.remove("user");

                // Show error message
                toast.error("Your session has expired. Please login again.");

                // Redirect to login page
                window.location.href = "/signin";
            }

            // Handle 403 Forbidden, so user can't access authorized routes
            if (error.response.status === 403) {
                toast.error(
                    "You do not have permission to perform this action."
                );
                window.location.href = "/dashboard";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
