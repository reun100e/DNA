import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import EditableField from "../components/Dashboard/EditableField";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "@/types/auth.types";
import { BadgeCheck, BadgeX } from "lucide-react";
import { ProPic } from "@/components/ProPic";

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    let timeout: NodeJS.Timeout | undefined;

    if (!isAuthenticated) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : prev));
      }, 1000);

      timeout = setTimeout(() => {
        logout();
        navigate("/login");
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [isAuthenticated, navigate, logout]);

  if (!isAuthenticated || !user) {
    return (
      <div className="redirect-message text-center mt-10">
        <p>
          Please log in to use the Dashboard. Redirecting to login in{" "}
          {countdown} seconds...
        </p>
      </div>
    );
  }

  const handleFieldUpdate = (field: keyof AuthUser, value: string) => {
    updateUser({
      [field]: value,
    });
  };

  return (
    <div className="dashboard p-6 max-w-lg mx-auto bg-popover rounded-lg shadow-md mt-10">
      <div className="profile-section text-center mb-6 flex flex-col items-center">
        <div className="profile-picture rounded-full w-24 h-24 mb-4 shadow-lg">
          <ProPic size="w-24 h-24 mb-4"/>
        </div>

        <h2 className="text-xl font-bold">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-gray-500">{user.bio || "DNA Member"}</p>
      </div>
      
      <div className="editable-fields space-y-6">

        <div className="field">
          <label className="block text-sm font-medium">Username</label>
          <div className="flex items-center">
            <span>{user.username}</span>
          </div>
        </div>

        <div className="field">
          <label className="block text-sm font-medium">DNA ID</label>
          <div className="flex items-center">
            <span>{user.dna_id}</span>
          </div>
        </div>

        <EditableField
          label="Email"
          value={user.email}
          onSave={(newValue) => handleFieldUpdate("email", newValue)}
          isEditable={true}
          icon={
            user.is_email_verified ? (
              <BadgeCheck color="darkgreen" />
            ) : (
              <BadgeX color="darkred"/>
            )
          }
          iconLabel={user.is_email_verified ? "Verified" : "Not Verified"}
        />

        {/* Display verification link if email is not verified */}
        {!user.is_email_verified && (
          <div className="text-center">
            <a href="./verify" className="text-blue-600 hover:text-blue-800">
              Click here to verify your email
            </a>
          </div>
        )}

        <EditableField
          label="Phone Number"
          value={user.phone_number}
          onSave={(newValue) => handleFieldUpdate("phone_number", newValue)}
          isEditable={!user.is_phone_verified}
          icon={
            user.is_phone_verified ? (
              <BadgeCheck color="darkgreen" />
            ) : ""
          }
          iconLabel={user.is_phone_verified ? "Verified" : "Not Verified"}
        />

      </div>
    </div>
  );
};

export default DashboardPage;
