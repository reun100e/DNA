import { useAuth } from "../context/AuthContext";

export const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h1>Welcome, {user.first_name} {user.last_name}!</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone_number}</p>
      <p>DNA ID: {user.dna_id}</p>
      <p>Email Verified: {user.is_email_verified ? 'Yes' : 'No'}</p>
      <p>Phone Verified: {user.is_phone_verified ? 'Yes' : 'No'}</p>
    </>
  );
};
