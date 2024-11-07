# Auth Interceptor Documentation

This document explains the setup and functionality of the authentication interceptor used for handling JWT-based authentication with automatic token refresh.

## Code Overview

File: `src/interceptors/authInterceptor.ts`

### Purpose

The interceptor is responsible for intercepting HTTP requests and handling token refreshes automatically upon a `401 Unauthorized` response.

### Components
- `apiClient`: Configured Axios instance for API requests.
- `processQueue`: Helper function to handle queued requests.
- `setupAuthInterceptor`: Sets up the interceptor and manages token refreshes.


For more details, see comments in `authInterceptor.ts`.

Here’s a detailed documentation for the code.

---

## `authInterceptor.ts`

This file sets up an Axios interceptor to handle authentication and token refresh for requests to a backend API. It enables a system where requests will automatically retry once if a `401 Unauthorized` error occurs, attempting to refresh the authentication token via a separate API call.

### Dependencies

- **Axios**: Used to handle HTTP requests.
- **AuthContext**: Custom context providing access to `logout` for logging out on refresh failure.
- **refreshUtils**: Utility functions to manage the token refresh state and queue handling during a refresh process.

### Key Components

1. **Axios Instance (`apiClient`)**: Configures Axios with a base URL and necessary headers for JSON requests, ensuring cookies (including HttpOnly cookies) are sent with each request.

2. **processQueue**: A helper function to retry or reject queued requests based on the success of the token refresh attempt.

3. **setupAuthInterceptor**: The main function that sets up the interceptor to handle token refresh logic on `401 Unauthorized` errors.

---

## Code Breakdown

### `apiClient`

```typescript
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', 
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
```

- **baseURL**: Sets the root URL for the API. Adjust this as needed for the actual API endpoint.
- **withCredentials**: Ensures that HttpOnly cookies are sent with each request.
- **headers**: Sets `Content-Type` to `application/json` by default for all requests.

### `processQueue`

```typescript
const processQueue = (error: any, refreshSuccess: boolean) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (refreshSuccess) {
      resolve(apiClient(error.config)); // Retry the original request on success
    } else {
      reject(error); // Reject request if refresh failed
    }
  });
  resetRefreshState(); // Clear the queue and reset state
};
```

- **Purpose**: Processes requests that were paused while waiting for a token refresh. 
- **Parameters**:
  - `error`: The error that occurred, either from the original request or the refresh attempt.
  - `refreshSuccess`: Boolean indicating if the refresh attempt succeeded.
- **Behavior**: If `refreshSuccess` is `true`, it retries each queued request with `apiClient`. Otherwise, it rejects each queued request with the provided `error`.

### `setupAuthInterceptor`

```typescript
export const setupAuthInterceptor = () => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          setRefreshing(true);
          try {
            await refreshToken();
            processQueue(null, true);
            return apiClient(originalRequest);
          } catch (refreshError) {
            const { logout } = useAuth();
            logout();
            processQueue(refreshError, false);
            return Promise.reject(refreshError);
          } finally {
            setRefreshing(false);
          }
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      return Promise.reject(error);
    }
  );
};
```

#### Steps Explained

1. **Intercepting Responses**:
   - `apiClient.interceptors.response.use()` adds a response interceptor that passes successful responses through and handles errors.

2. **Checking for `401 Unauthorized`**:
   - If the server responds with `401` and `originalRequest._retry` is `false`, it indicates the request is unauthorized and hasn’t been retried yet.
   - The `originalRequest._retry = true;` flag prevents infinite retry loops.

3. **Handling Token Refresh**:
   - **If Not Already Refreshing**:
     - Sets `isRefreshing` to `true` to avoid multiple refresh attempts.
     - Tries to refresh the token with `await refreshToken()`.
     - **On Success**: Calls `processQueue(null, true);` to retry all queued requests and retries the `originalRequest`.
     - **On Failure**: Calls `logout()` to log the user out and processes the queue with `processQueue(refreshError, false);`.
   - **If Refresh Already in Progress**:
     - Queues the request by adding it to `failedQueue` with `resolve` and `reject` functions to handle success or failure.

4. **Resetting Refresh State**:
   - After any refresh attempt, whether successful or failed, the `finally` block sets `isRefreshing` to `false`.

### Exported Objects

- `apiClient`: The configured Axios instance.
- `setupAuthInterceptor`: Initializes the interceptor and should be called once when setting up the app (e.g., during initial app loading).

### Usage

1. **Setup Interceptor**: Call `setupAuthInterceptor()` in the application initialization (e.g., inside a main component or app setup function).
2. **API Requests**: Use `apiClient` for all API requests to ensure authentication is handled automatically.

---

## Utility Considerations

- **failedQueue**: This array stores requests awaiting a token refresh, ensuring all requests are properly retried or rejected after a refresh attempt.
- **refreshUtils**: These utilities manage the refresh state and help keep the code clean and modular by separating concerns.

### Potential Issues

- **Infinite Loops**: The `_retry` flag on `originalRequest` prevents infinite loops by ensuring each request is only retried once on `401`.
- **Network Performance**: Queued requests could delay responses if refresh times are long. Consider optimizing the token refresh endpoint and handling to reduce latency.

---