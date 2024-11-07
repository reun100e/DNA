import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isRefreshing } from "../utils/refreshUtils";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  // console.log(isAuthenticated)
  console.log(isRefreshing);
  console.log();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;

    if (!isRefreshing) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
