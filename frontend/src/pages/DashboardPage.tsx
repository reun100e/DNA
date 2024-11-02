import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthUser } from '../types/auth.types';
import EditableField from '../components/Dashboard/EditableField';
import ProfilePictureUpload from '../components/Dashboard/ProfilePictureUpload';
import HistorySection from '../components/Dashboard/HistorySection';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { isAuthenticated, user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isAuthenticated) {
      const interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      const timeout = setTimeout(() => navigate('/login'), 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>Please Log in to use the Dashboard. Redirecting to login in {countdown} seconds...</p>
      </div>
    );
  }

  const handleSave = (field: keyof AuthUser, value: string) => {
    updateUser({ ...user, [field]: value });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <ProfilePictureUpload
        profilePicture={user.profile_picture}
        onUpload={(file) => console.log('Upload logic here', file)}
      />

      <EditableField
        label="Username"
        value={user.username}
        onSave={(value) => handleSave('username', value)}
      />
      <EditableField
        label="First Name"
        value={user.first_name}
        onSave={(value) => handleSave('first_name', value)}
      />
      <EditableField
        label="Last Name"
        value={user.last_name}
        onSave={(value) => handleSave('last_name', value)}
      />
      <EditableField
        label="Email"
        value={user.email}
        onSave={(value) => handleSave('email', value)}
      />
      <EditableField
        label="Phone Number"
        value={user.phone_number}
        onSave={(value) => handleSave('phone_number', value)}
      />

      <HistorySection
        title="Events Participated"
        items={user?.events?.map((event) => (
          <div key={event.id}>{event.name} on {event.date}</div>
        )) || []}
      />

      <HistorySection
        title="Awards Won"
        items={user?.awards?.map((award) => (
          <div key={award.id}>{award.title} on {award.date}</div>
        )) || []}
      />

      <HistorySection
        title="Prizes Won"
        items={user?.prizes?.map((prize) => (
          <div key={prize.id}>{prize.name} on {prize.date}</div>
        )) || []}
      />


    </div>
  );
};