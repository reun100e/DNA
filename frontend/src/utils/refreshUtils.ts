// Track retry attempts to avoid infinite loops
export let isRefreshing = false;
export let failedQueue: { resolve: (value?: any) => void; reject: (reason?: any) => void }[] = [];

// Function to reset the refresh state and clear the queue
export const resetRefreshState = () => {
  isRefreshing = false;
  failedQueue = [];
};

// Function to set the refresh state
export const setRefreshing = (value: boolean) => {
  isRefreshing = value;
};
