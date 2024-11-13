import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import TopNavbar from "./components/Navbar/TopNavbar";
import { setupAuthInterceptor } from "./interceptors/authInterceptor";
import { Footer } from "./components/Footer/Footer";
import { Progress } from "./components/ui/progress";

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = React.useState(13);

  useEffect(() => {
    setupAuthInterceptor();
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(76), 100);
    return () => clearTimeout(timer);
  }, []);

  // Ensure everything is loaded before rendering the app
  useEffect(() => {
    // Wait for all assets (JS, CSS, images, fonts) to load before rendering
    const handleLoad = () => {
      // Remove the fallback loading screen from the DOM
      const fallbackLoadingScreen = document.getElementById(
        "fallback-loading-screen"
      );
      if (fallbackLoadingScreen) {
        fallbackLoadingScreen.classList.add("fade-out");

        // Remove the fallback loading screen after the fade-out duration
        setTimeout(() => {
          fallbackLoadingScreen.remove();
        }, 500); // Matched timeout to the CSS animation duration
      }

      // Adding a 500ms delay after load to improve layout stability
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    };

    // Listen for the window load event to detect when everything has finished loading
    if (document.readyState === "complete") {
      handleLoad(); // If everything is already loaded
    } else {
      window.addEventListener("load", handleLoad); // Otherwise, wait for the window to finish loading
    }

    // Cleanup the event listener
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="loading-screen bg-popover">
        <Progress value={progress} className="w-[40%]" />
      </div>
    );
  }

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
