import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import TopNavbar from "./components/Navbar/TopNavbar";
import { setupAuthInterceptor } from "./interceptors/authInterceptor";
import { Footer } from "./components/Footer/Footer";
import { AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  useEffect(() => {
    setupAuthInterceptor();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <TopNavbar />
        <main className="flex flex-col min-h-screen">
          <AnimatePresence mode="wait">
            <AppContent />
          </AnimatePresence>
          <Footer />
        </main>
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/*" element={<AppRoutes />} />
      {/* Other routes can be added here as needed */}
    </Routes>
  );
};

export default App;
