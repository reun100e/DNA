import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { resendEmailOtp, resendPhoneOtp } from "../services/authService";
import "../styles/VerifyPage.css";

const VerifyPage = () => {
  const { verifyEmail, verifyPhone } = useAuth();
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVerification = async (type: "email" | "phone") => {
    setIsVerifying(true);
    setError(null);

    try {
      if (type === "email") {
        await verifyEmail(emailOtp);
        alert("Email verified successfully!");
      } else {
        await verifyPhone(phoneOtp);
        alert("Phone verified successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      setError(`Invalid ${type} OTP.`);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async (type: "email" | "phone") => {
    if (type === "email") {
      await resendEmailOtp();
      alert("Email OTP resent!");
    } else {
      await resendPhoneOtp();
      alert("Phone OTP resent!");
    }
  };

  return (
    <div className="verification-container">
      <h2>Verify Your Account</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="otp-section">
        <input
          type="text"
          placeholder="Enter Email OTP"
          value={emailOtp}
          onChange={(e) => setEmailOtp(e.target.value)}
          maxLength={6}
        />
        <button
          onClick={() => handleVerification("email")}
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify Email"}
        </button>
        <button onClick={() => handleResendOtp("email")} className="resend-btn">
          Resend Email OTP
        </button>
      </div>

      <div className="otp-section">
        <input
          type="text"
          placeholder="Enter Phone OTP"
          value={phoneOtp}
          onChange={(e) => setPhoneOtp(e.target.value)}
          maxLength={6}
        />
        <button
          onClick={() => handleVerification("phone")}
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify Phone"}
        </button>
        <button onClick={() => handleResendOtp("phone")} className="resend-btn">
          Resend Phone OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
