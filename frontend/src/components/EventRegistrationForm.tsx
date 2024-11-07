// src/components/EventRegistrationForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Custom hook to access AuthContext

interface EventRegistrationFormProps {
  eventId: number;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ eventId }) => {
  const { registerForEvent } = useAuth();
  const [registrationType, setRegistrationType] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerForEvent({ event_id: eventId, registration_type: registrationType });
      alert("Successfully registered for the event!");
    } catch (error) {
      console.error("Failed to register for the event:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Registration Type:
        <select value={registrationType} onChange={(e) => setRegistrationType(Number(e.target.value))}>
          {/* Assuming registration types are numbered, add options dynamically if available */}
          <option value={1}>General Admission</option>
          <option value={2}>VIP</option>
        </select>
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default EventRegistrationForm;
