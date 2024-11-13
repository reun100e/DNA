import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
            <AppRoutes />
          </AnimatePresence>
          <Footer />
        </main>
      </AuthProvider>
    </Router>
  );
};

export default App;
