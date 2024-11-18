import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import RegistrationsCard from "./RegistrationsCard";
import NotificationsCard from "./NotificationsCard";

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isAuthenticated) {
      const interval = setInterval(() => {
        setCountdown((prev) => Math.max(prev - 1, 0));
      }, 1000);

      const timeout = setTimeout(() => {
        logout();
        navigate("/login");
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isAuthenticated, logout, navigate]);

  if (!isAuthenticated || !user) {
    return (
      <div className="redirect-message text-center mt-10">
        <LoadingSpinner
          message={`Redirecting to login in ${countdown} seconds...`}
        />
      </div>
    );
  }

  return (
    <div className="dashboard-page container mx-auto px-4 pt-6 space-y-6">
      <ProfileCard />

      <RegistrationsCard />

      <NotificationsCard />
    </div>
  );
};

export default DashboardPage;
