import axios from 'axios';
import { refreshToken } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { isRefreshing, failedQueue, setRefreshing, resetRefreshState } from '../utils/refreshUtils';

const apiUrl = `${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_API_URL}`;

// Create the axios instance for your API client
const apiClient = axios.create({
  baseURL: apiUrl || 'http://127.0.0.1:8000/api/v1',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Function to process queued requests waiting for a new token
const processQueue = (error: any, refreshSuccess: boolean) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (refreshSuccess) {
      // Retry the original request if refresh was successful
      resolve(apiClient(error.config));
    } else {
      // Reject the request if refresh failed
      reject(error);
    }
  });
  resetRefreshState(); // Clear the queue and reset refresh state
};

export const setupAuthInterceptor = () => {
  apiClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
      const originalRequest = error.config;

      // Check for 401 error and ensure the request hasn't been retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite retry loops

        // If no other refresh is in progress, start a new refresh
        if (!isRefreshing) {
          setRefreshing(true);

          try {
            // Attempt to refresh the token
            await refreshToken();
            processQueue(null, true); // Process queued requests as successful
            return apiClient(originalRequest); // Retry the original request
          } catch (refreshError) {
            const { logout } = useAuth();
            logout(); // Log out the user on refresh failure
            processQueue(refreshError, false); // Reject queued requests on failure
            return Promise.reject(refreshError);
          } finally {
            setRefreshing(false); // Reset refreshing state
          }
        }

        // If a refresh is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      // Handle non-401 errors normally
      return Promise.reject(error);
    }
  );
};

export default apiClient;



