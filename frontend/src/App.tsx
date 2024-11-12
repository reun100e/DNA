import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import TopNavbar from "./components/Navbar/TopNavbar";
import { setupAuthInterceptor } from "./interceptors/authInterceptor";
import { Footer } from "./components/Footer/Footer";

const App: React.FC = () => {
  useEffect(() => {
    setupAuthInterceptor();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <main className="flex flex-col min-h-screen">
          <TopNavbar />
          <AppRoutes />
          <Footer />
        </main>
      </AuthProvider>
    </Router>
  );
};

export default App;
