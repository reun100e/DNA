import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const VerifyPage = () => {
  const { verifyEmail, verifyPhone } = useAuth();
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const navigate = useNavigate();

  const handleEmailVerify = async () => {
    try {
      await verifyEmail(emailOtp);
      alert('Email verified!');
    } catch {
      alert('Invalid email OTP.');
    }
  };

  const handlePhoneVerify = async () => {
    try {
      await verifyPhone(phoneOtp);
      navigate('/dashboard');
    } catch {
      alert('Invalid phone OTP.');
    }
  };

  return (
    <div>
      <h2>Verify Email and Phone</h2>
      <input type="text" placeholder="Email OTP" onChange={(e) => setEmailOtp(e.target.value)} />
      <button onClick={handleEmailVerify}>Verify Email</button>

      <input type="text" placeholder="Phone OTP" onChange={(e) => setPhoneOtp(e.target.value)} />
      <button onClick={handlePhoneVerify}>Verify Phone</button>
    </div>
  );
};
