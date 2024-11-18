import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
