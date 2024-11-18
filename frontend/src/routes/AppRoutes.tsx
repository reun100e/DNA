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
import PrivacyPolicy from "@/pages/public/PrivacyPolicy";
import TermsAndConditions from "@/pages/public/TermsAndConditions";
import ContactPage from "@/pages/public/ContactPage";
import DiimunHome from "@/pages/diimun/DiimunHome";
import DiimunHomeOld from "@/pages/diimun/DiimunHomeOld";
import GreatHomoeopathicAssemblyPage from "@/pages/diimun/GreatHomoeopathicAssemblyPage";
import WHOAssemblyPage from "@/pages/diimun/WHOAssemblyPage";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
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
    // Temporarily set body overflow to hidden to prevent flashing
    document.body.style.overflow = "hidden";

    const savedScrollPosition = scrollPositions.current.get(location.key);

    // Delay scroll restoration to allow fade-in animation to complete
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: savedScrollPosition ?? 0,
        behavior: "smooth",
      });
      document.body.style.overflow = ""; // Restore body overflow
    }, 100); // 300ms delay to match transition duration

    return () => clearTimeout(scrollTimeout);
  }, [location]);

  const Docs = () => {
    window.location.href = import.meta.env.VITE_DOCS_URL;
    return null;
  };

  return (
    <>
      <ScrollToTop /> {/* Smooth scroll-to-top on every route change */}
      <AnimatePresence mode="sync">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          transition={{ duration: 0.1 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route element={<Loading />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
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
                <Route path="/pay" element={<PaymentPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
              <Route path="/docs" element={<Docs />} />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
