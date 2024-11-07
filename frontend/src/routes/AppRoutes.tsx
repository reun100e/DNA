import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VerifyPage from "../pages/VerifyPage";
import DashboardPage from "../pages/DashboardPage";
import PaymentPage from "../pages/PaymentPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ProtectedVerificationRoute from "./ProtectedVerificationRoute";
import EventPage from "../pages/EventPage";

export const AppRoutes = () => (
  <div className="app-body">
    <Routes>

      <Route path="/" element={<HomePage />} />

      {/* if authenticated or interceptor refreshing, then redirect to Home */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Route for verified users  */}
      <Route element={<ProtectedVerificationRoute />}>
        <Route path="/verify" element={<VerifyPage />} />
      </Route>

      {/* Private Routes for authenticated and verified users */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>

        <Route path="/event" element={<EventPage />} />

      <Route path="*" element={<NotFound />} /> {/* Handle 404s */}
    </Routes>
  </div>
);

export default AppRoutes;
