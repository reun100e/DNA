import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = () => {
  const { isAuthenticated, user } = useAuth();

  // Log state to check for every render.
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  // Handle loading or missing state gracefully.
  if (isAuthenticated === true && user === null) {
    return <div>Loading...</div>;
  }


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.is_email_verified || !user?.is_phone_verified) {
    return <Navigate to="/verify" replace />;
  }

  return <Outlet />;
};
