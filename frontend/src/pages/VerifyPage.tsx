import React, { useState, useEffect } from "react";
import { OtpInput } from "@/components/otp/OtpInput";
import { sendOtp, verifyOtp } from "../services/otpService";
import { Otp } from "../types/otp.types";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";


const VerificationPage: React.FC = () => {
  const { user } = useAuth();

  const [otpType, setOtpType] = useState<"email" | "phone" | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState({ resend: false, verify: false });
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);


        useEffect(() => {
          if (user) {
      // Determine the type of OTP to send (email or phone) and trigger OTP sending
      setOtpType(!user.is_email_verified ? "email" : !user.is_phone_verified ? "phone" : null);
    }
  }, [user]);


  // Automatically send OTP when otpType is set
  useEffect(() => {
    if (otpType) {
      handleSendOtp();
    }
  }, [otpType]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setInterval(() => setResendCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleSendOtp = async () => {
    if (!otpType) return;
    setLoading((prev) => ({ ...prev, resend: true }));
    try {
      setSuccessMessage("");
      setErrorMessage("");
      const response = await sendOtp({ otp_type: otpType } as Otp);
      setSuccessMessage(response.message);
      setResendCountdown(60); // 1-minute countdown
      setOtpSent(true); // Show OTP input field
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, resend: false }));
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpType) return;
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

      // Reset countdown and otp input if verification is successful
      setResendCountdown(0);
      setOtp(Array(6).fill(""));

      // if (otpType === "email" && !user?.is_phone_verified) {
      //   setOtpType("phone");
      //   setOtpSent(false); // Reset for next OTP
      // } else {
        setOtpType(null); // End verification after email
      // }
    } catch (error) {
      setErrorMessage("OTP verification failed. Check the OTP and try again.");
    } finally {
      setLoading((prev) => ({ ...prev, verify: false }));
    }
  };

  const handleOtpChange = (value: string[]) => {
    setOtp(value); // Update OTP state without triggering verification directly
  };

  useEffect(() => {
    // Trigger verification when all OTP fields are filled
    if (otp.every((digit) => digit)) {
      handleVerifyOtp();
    }
  }, [otp]); // This effect will run every time `otp` updates

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {otpType === "email" ? "Verify Your Email" : "Verify Your Phone"}
        </h2>
        <p className="text-muted mb-6 text-center">
          {otpType === "email"
            ? "We have sent an OTP to your email. Please enter it below to verify."
            : "We have sent an OTP to your phone. Please enter it below to verify."}
        </p>

        {successMessage && (
          <p className="text-primary mb-4 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-destructive mb-4 text-center">{errorMessage}</p>
        )}

        {/* Show OTP Input only if OTP is sent */}
        {otpSent && (
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

        {!otpType && (
          <p className="text-accent text-center mt-4 font-medium">
            Verification successful!
          </p>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
