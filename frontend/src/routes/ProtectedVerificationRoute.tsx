import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedVerificationRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if (user?.is_email_verified && user?.is_phone_verified) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
};
export default ProtectedVerificationRoute;
