// src/pages/EventPage.tsx
import React from 'react';
import EventRegistrationForm from '../components/EventRegistrationForm';

const EventPage: React.FC = () => {
  const eventId = 1; // This would come dynamically, based on the selected event

  return (
    <div>
      <h1>Event Registration</h1>
      <EventRegistrationForm eventId={eventId} />
    </div>
  );
};

export default EventPage;
