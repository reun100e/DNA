import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import { setupAuthInterceptor } from "./interceptors/authInterceptor";
import "./styles/App.css";

const App: React.FC = () => {
  useEffect(() => {
    setupAuthInterceptor();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
