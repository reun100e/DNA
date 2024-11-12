import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/public/NotFound";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import VerifyPage from "../pages/VerifyPage";
import DashboardPage from "../pages/DashboardPage";
import PaymentPage from "../pages/PaymentPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ProtectedVerificationRoute from "./ProtectedVerificationRoute";
import Loading from "./Loading";
import AboutPage from "@/pages/public/AboutPage";
import PrivacyPage from "@/pages/public/PrivacyPage";
import TermsPage from "@/pages/public/TermsPage";
import ContactPage from "@/pages/public/ContactPage";

export const AppRoutes = () => (

      <Routes>
        <Route element={<Loading />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />


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

          <Route path="*" element={<NotFound />} /> {/* Handle 404s */}
        </Route>
      </Routes>

);

export default AppRoutes;
