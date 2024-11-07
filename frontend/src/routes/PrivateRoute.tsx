import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && (!user.is_email_verified || !user.is_phone_verified)) {
    return <Navigate to="/verify" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
