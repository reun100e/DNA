import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "@/components/ScrollToTop";

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
import DiimunHome from "@/pages/diimun/DiimunHome";
import DiimunHomeOld from "@/pages/diimun/DiimunHomeOld";
import GreatHomoeopathicAssemblyPage from "@/pages/diimun/GreatHomoeopathicAssemblyPage";
import WHOAssemblyPage from "@/pages/diimun/WHOAssemblyPage";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const AppRoutes = () => {
  const location = useLocation();
  const scrollPositions = useRef(new Map());

  useEffect(() => {
    // Save the scroll position when the route changes
    return () => {
      scrollPositions.current.set(location.key, window.scrollY);
    };
  }, [location]);

  useEffect(() => {
    // Restore scroll position if it exists
    const savedScrollPosition = scrollPositions.current.get(location.key);
    window.scrollTo(0, savedScrollPosition || 0);
  }, [location]);

  return (
    <>
      <ScrollToTop /> {/* Scroll to top on every route change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route element={<Loading />}>

              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/diimun" element={<DiimunHome />} />
              <Route path="/diimun-old" element={<DiimunHomeOld />} />
              <Route
                path="/great-homoeopathic-assembly"
                element={<GreatHomoeopathicAssemblyPage />}
              />
              <Route path="/who-assembly" element={<WHOAssemblyPage />} />


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

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
