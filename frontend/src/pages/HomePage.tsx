import { useNavigate } from "react-router-dom";


export const HomePage = () => {
  const navigate = useNavigate();

  const events = [
    { id: "1", name: "Medical Conference" },
    { id: "2", name: "Health Workshop" },
  ];

  const handleClick = () => {
      navigate('/dashboard');
  };

  const handleRegisterClick = (eventId: string) => {
    navigate(`/register?event=${eventId}`);
  };

  return (
    <div>
      <button onClick={handleClick}>Dashboard</button>
      <h1>Available Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name}
            <button onClick={() => handleRegisterClick(event.id)}>
              Register
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
