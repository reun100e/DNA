import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import "./styles/App.css";
import { setupAuthInterceptor } from "./interceptors/authInterceptor";

const App: React.FC = () => {
  useEffect(() => {
    setupAuthInterceptor();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <AppRouter />
      </AuthProvider>
    </Router>
  );
};

export default App;
