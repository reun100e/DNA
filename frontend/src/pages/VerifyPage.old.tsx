import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OtpInput } from "@/components/otp/OtpInput";
import { sendOtp, verifyOtp } from "../services/otpService";
import { Otp } from "../types/otp.types";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

const VerificationPage: React.FC = () => {
  const { user, isAuthenticated, fetchUser } = useAuth();
  const navigate = useNavigate();

  const [otpType, setOtpType] = useState<"email" | null>(null); // Only email verification for now
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // Stores OTP digits
  const [loading, setLoading] = useState({ resend: false, verify: false });
  const [otpSent, setOtpSent] = useState(false); // Indicates if OTP has been sent
  const [successMessage, setSuccessMessage] = useState(""); // Success message to show
  const [errorMessage, setErrorMessage] = useState(""); // Error message to show
  const [resendCountdown, setResendCountdown] = useState(0); // Countdown for OTP resend
  const [isVerificationComplete, setIsVerificationComplete] = useState(false); // Whether verification is complete
  const [countdown, setCountdown] = useState(5); // Countdown for redirection after success

  useEffect(() => {
    if (user) {
      setOtpType(!user.is_email_verified ? "email" : null); // Enable email verification if email is not verified
    }
  }, [user]);

  useEffect(() => {
    if (otp.every((digit) => digit)) {
      handleVerifyOtp();
    }
  }, [otp]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setInterval(() => setResendCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  useEffect(() => {
    if (isVerificationComplete) {
      // Start countdown to redirect after verification
      const redirectTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        navigate("/dashboard");
      }

      return () => clearInterval(redirectTimer); // Clean up interval
    }
  }, [isVerificationComplete, countdown, navigate]);

  const handleSendOtp = async () => {
    if (!otpType) return; // Skip OTP sending if otpType is null
    setLoading((prev) => ({ ...prev, resend: true }));
    try {
      setSuccessMessage("");
      setErrorMessage("");
      const response = await sendOtp({ otp_type: otpType } as Otp);
      setSuccessMessage(response.message);
      setResendCountdown(60);
      setOtpSent(true);
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, resend: false }));
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpType) return; // Skip OTP verification if otpType is null
    setLoading((prev) => ({ ...prev, verify: true }));
    try {
      setSuccessMessage("");
      setErrorMessage("");
      const otpCode = otp.join("");
      const response = await verifyOtp({
        otp_type: otpType,
        otp_code: otpCode,
      } as Otp);
      setSuccessMessage(response.message);

      setResendCountdown(0);
      setOtp(Array(6).fill(""));

      if (response.message == "Email verified successfully") {
        setOtpType(null);
        setIsVerificationComplete(true); // Set verification complete
      }
    } catch (error) {
      setErrorMessage("OTP verification failed. Check the OTP and try again.");
    } finally {
      setLoading((prev) => ({ ...prev, verify: false }));
    }
  };

  const handleOtpChange = (value: string[]) => {
    setOtp(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {otpType === "email" ? "Verify Your Email" : ""}
        </h2>
        <p className="text-muted mb-6 text-center">
          {otpType === "email"
            ? "We have sent an OTP to your email. Please enter it below to verify."
            : ""}
        </p>

        {successMessage && (
          <p className="text-primary mb-4 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-destructive mb-4 text-center">{errorMessage}</p>
        )}

        {otpSent && !isVerificationComplete && (
          <div className="flex justify-center mb-6">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              disabled={loading.verify}
            />
          </div>
        )}

        <div className="flex gap-4 mt-6 justify-center">
          <button
            onClick={handleSendOtp}
            disabled={loading.resend || resendCountdown > 0}
            className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 
              ${
                loading.resend || resendCountdown > 0
                  ? "bg-primary text-primary-foreground opacity-50 cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-opacity-90"
              }`}
          >
            {loading.resend ? (
              <CircularProgress size={24} color="inherit" />
            ) : resendCountdown > 0 ? (
              `Resend OTP (${resendCountdown}s)`
            ) : (
              "Send OTP"
            )}
          </button>
          <button
            onClick={handleVerifyOtp}
            disabled={!otpSent || loading.verify || otp.some((digit) => !digit)}
            className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 
              ${
                !otpSent || loading.verify || otp.some((digit) => !digit)
                  ? "bg-secondary text-secondary-foreground opacity-50 cursor-not-allowed"
                  : "bg-secondary text-secondary-foreground hover:bg-opacity-90"
              }`}
          >
            {loading.verify ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Verify OTP"
            )}
          </button>
        </div>

        {!otpType && isVerificationComplete && (
          <>
            <p className="text-accent text-center mt-4 font-medium">
              Verification successful! Redirecting in {countdown}s...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
