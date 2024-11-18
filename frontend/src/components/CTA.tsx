import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

export const CTA = () => {
  const { isAuthenticated, user, fetchMyRegistrations, registerForEvent } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleRegister = async () => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        if (!user?.is_registered) {
          const response = await registerForEvent(2);
          toast.info(response);
        }
        if (user?.is_registered) {
          if (user?.is_payment_complete) {
            navigate("/docs");
          } else {
            toast.info("Please complete the payment!");
            navigate("/pay");
          }
        }
      } else {
        toast.info("Please Login / Register to continue"); // Changed to info for consistency
        navigate("/register");
      }
    } catch (error: any) {
      if (error.message === "Authentication credentials were not provided.") {
        toast.info("Please log in to register for this event.");
        navigate("/login");
      } else {
        toast.error(error.message || "An error occurred during registration.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 text-center">
      <Button
        className="p-6 text-xl"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : user?.is_payment_complete
          ? "Prepare for DIIMUN"
          : user?.is_registered
          ? "Complete payment"
          : "Register for DIIMUN"}
      </Button>
    </div>
  );
};

export default CTA;
