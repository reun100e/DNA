import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OtpInput } from "@/components/otp/OtpInput";
import { sendOtp, verifyOtp } from "../services/otpService";
import { Otp } from "../types/otp.types";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

const VerificationPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [otpType, setOtpType] = useState<"email" | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState({ resend: false, verify: false });
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (user?.is_email_verified) {
      setOtpType(null);
      setIsVerificationComplete(true);
    } else {
      setOtpType("email");
    }
  }, [user]);

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

  useEffect(() => {
    if (isVerificationComplete) {
      const redirectTimer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        navigate("/dashboard");
      }

      return () => clearInterval(redirectTimer);
    }
  }, [isVerificationComplete, countdown, navigate]);

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
    } catch (error: any) {
      setErrorMessage(
        error?.message || "Failed to send OTP. Please try again."
      );
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

      setResendCountdown(0);
      setOtp(Array(6).fill(""));

      if (
        otpType === "email" &&
        response.message === "Email verified successfully"
      ) {
        setOtpType(null);
        setOtpSent(false);
        setIsVerificationComplete(true);
        console.log(setIsVerificationComplete(true));
      }
    } catch (error: any) {
      setErrorMessage(
        error?.message ||
          "OTP verification failed. Check the OTP and try again."
      );
    } finally {
      setLoading((prev) => ({ ...prev, verify: false }));
    }
  };

  const handleOtpChange = (value: string[]) => {
    setOtp(value);
  };

  // Automatic OTP verification only occurs when all fields are filled
  useEffect(() => {
    if (otp.every((digit) => digit) && otp.length === 6) {
      handleVerifyOtp();
    }
  }, [otp]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {otpType === "email" ? "Verify Your Email" : ""}
        </h2>

        <p className="text-foreground mb-6 text-center px-2">
          {otpType === "email" ? (
            <>
              Please enter the OTP sent to{" "}
              <span className="text-popover-foreground font-semibold">{user?.email}</span>
            </>
          ) : (
            ""
          )}
        </p>

        {successMessage && (
          <p className="text-primary mb-4 text-center font-medium">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-destructive mb-4 text-center font-medium">
            {errorMessage}
          </p>
        )}

        {otpSent && (
          <div className="flex justify-center mb-6 text-primary">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              disabled={loading.verify}
            />
          </div>
        )}



        {otpType && (
        <div className="text-center mb-6">
        <div
          onClick={() => navigate("/dashboard")}
          className="text-sm font-semibold underline cursor-pointer text-destructive"
        >
          Not your Email ID?
        </div>
      </div>
        )}





        {otpType && (
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={handleSendOtp}
              disabled={loading.resend || resendCountdown > 0}
              className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 text-white transition ${
                loading.resend || resendCountdown > 0
                  ? "bg-primary text-primary-foreground opacity-50 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark"
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
              disabled={
                !otpSent || loading.verify || otp.some((digit) => !digit)
              }
              className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 text-white transition ${
                !otpSent || loading.verify || otp.some((digit) => !digit)
                  ? "bg-secondary text-secondary-foreground opacity-50 cursor-not-allowed"
                  : "bg-secondary hover:bg-secondary-dark"
              }`}
            >
              {loading.verify ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        )}

        {!otpType && (
          <p className="text-foreground text-center mt-4 font-medium">
            Please wait...
          </p>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
