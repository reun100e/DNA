import axios from 'axios';
import { refreshToken } from '../services/authService';
import { useAuth } from '../context/AuthContext';

// Create the axios instance for your API client
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', // Adjust the base URL accordingly
  withCredentials: true, // Ensure HttpOnly cookies are sent with requests
  headers: { 'Content-Type': 'application/json' },
});

// Track retry attempts to avoid infinite loops
let isRefreshing = false;
let failedQueue: { resolve: (value?: any) => void; reject: (reason?: any) => void }[] = [];

// Function to process queued requests waiting for a new token
const processQueue = (error: any, tokenAvailable: boolean) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (tokenAvailable) {
      resolve(apiClient(error.config)); // Retry with original config
    } else {
      reject(error); // Reject if refresh failed
    }
  });
  failedQueue = []; // Clear the queue
};


export const setupAuthInterceptor = () => {
  apiClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized errors only if the original request is not retrying
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true; // Avoid multiple refresh calls

          try {
            await refreshToken(); // Try refreshing the token
            isRefreshing = false;
            processQueue(null, true); // Process queued requests
            return apiClient(originalRequest); // Retry the original request
          } catch (refreshError) {
            isRefreshing = false;
            processQueue(refreshError, false); // Reject queued requests
            const { logout } = useAuth(); // Logout on refresh failure
            logout(); // Clear user state and redirect
            return Promise.reject(refreshError);
          }
        }

        // If another refresh is already in progress, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      return Promise.reject(error); // Handle other non-401 errors normally
    }
  );
};

export default apiClient;
