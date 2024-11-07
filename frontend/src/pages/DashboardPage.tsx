import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthUser } from "../types/auth.types";
import EditableField from "../components/Dashboard/EditableField";
import ProfilePictureUpload from "../components/Dashboard/ProfilePictureUpload";
import HistorySection from "../components/Dashboard/HistorySection";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardPage.css";

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user, updateUser, fetchAdditionalUserData } =
    useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isAuthenticated) {
      const interval = setInterval(
        () => setCountdown((prev) => prev - 1),
        1000
      );
      const timeout = setTimeout(() => navigate("/login"), 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      const fetchData = async () => await fetchAdditionalUserData();
      fetchData();
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return (
      <div className="redirect-message">
        <p>
          Please Log in to use the Dashboard. Redirecting to login in{" "}
          {countdown} seconds...
        </p>
      </div>
    );
  }

  const handleSave = (field: keyof AuthUser, value: string) => {
    updateUser({ ...user, [field]: value });
  };

  return (
    <div className="dashboard">
      <div className="profile-section">
        <ProfilePictureUpload
          profilePicture={user.profile_picture}
          onUpload={(file) => console.log("Upload logic here", file)}
        />
        <div className="editable-fields">
          <EditableField
            label="Username"
            value={user.username}
            onSave={(value) => handleSave("username", value)}
          />
          <EditableField
            label="First Name"
            value={user.first_name}
            onSave={(value) => handleSave("first_name", value)}
          />
          <EditableField
            label="Last Name"
            value={user.last_name}
            onSave={(value) => handleSave("last_name", value)}
          />
          <EditableField
            label="Email"
            value={user.email}
            onSave={(value) => handleSave("email", value)}
          />
          <EditableField
            label="Phone Number"
            value={user.phone_number}
            onSave={(value) => handleSave("phone_number", value)}
          />
        </div>
      </div>

      <div className="history-sections">
        <HistorySection
          title="Events Participated"
          items={
            user?.programs?.map((program) => (
              <div className="program" key={program.id}>
                <h3>{program.name}</h3>
                <p>{program.description}</p>
                {program.events.map((event) => (
                  <div className="event" key={event.id}>
                    <h4>{event.name}</h4>
                    <p>{event.description}</p>
                    <p className="event-date">
                      {new Date(event.event_date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )) || []
          }
        />

        <HistorySection
          title="Badges"
          items={
            user?.badges?.map((badge) => (
              <div className="award" key={badge.id}>
                <strong>{badge.title}</strong>
                <span className="award-date">
                  on {new Date(badge.date).toLocaleDateString()}
                </span>
              </div>
            )) || []
          }
        />
      </div>
    </div>
  );
};

export default DashboardPage;
