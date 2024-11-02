import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = () => {
  const { isAuthenticated, user } = useAuth();

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  console.log("Hello sleep test");
  sleep(0).then(() => {
    console.log("World!");

    // Log state to check for every render.
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);

    // Handle loading or missing state gracefully.
    if (isAuthenticated === true && user === null) {
      return <>Please Login to access the Dashboard...</>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (!user?.is_email_verified || !user?.is_phone_verified) {
      return <Navigate to="/verify" replace />;
    }
  });
  return <Outlet />;
};
