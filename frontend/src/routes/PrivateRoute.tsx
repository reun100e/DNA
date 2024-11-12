import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { isAuthenticated, user, fetchUserProfile } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch user profile only if authenticated and user is not loaded
      fetchUserProfile().catch((error) => {
        console.error("Failed to fetch user profile:", error);
      });
    }
  }, [isAuthenticated, fetchUserProfile]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if (user && (!user.is_email_verified)) {
  //   return <Navigate to="/verify" replace />;
  // }

  // if (user && (!user.is_email_verified || !user.is_phone_verified)) {
  //   return <Navigate to="/verify" replace />;
  // }


  return <Outlet />;
};

export default PrivateRoute;
