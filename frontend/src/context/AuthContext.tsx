// src/context/AuthContext.tsx

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthUser,
  LoginCredentials,
  RegisterFormData,
} from "../types/auth.types";
import {
  loginUser,
  registerUser,
  fetchUserProfile,
  logoutUser,
  verifyEmailOtp,
  verifyPhoneOtp,
  resendEmailOtp,
  resendPhoneOtp,
  patchUserProfile,
  MyPayments,
  MyPrograms,
  MyBadges,
} from "../services/authService";
import { resetRefreshState } from "../utils/refreshUtils";
import { registerForEvent } from "../services/eventService";
import { RegisterEventData } from "../types/auth.types";

interface AuthContextProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  logout: () => void;
  verifyEmail: (otp: string) => Promise<void>;
  verifyPhone: (otp: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
  resendEmailOtp: () => Promise<void>;
  resendPhoneOtp: () => Promise<void>;
  updateUser: (updatedUser: Partial<AuthUser>) => Promise<void>;
  fetchAdditionalUserData: () => Promise<void>;
  registerForEvent: (data: RegisterEventData) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fingerprint = localStorage.getItem("fingerprint");
    if (fingerprint) fetchProfile();
  }, [isAuthenticated]);
  // fetchProfile();
  // fetchProfile().catch(() => logout()); // Logout on failure to fetch latest user data on app load.

  const fetchProfile = async () => {
    try {
      const profile = await fetchUserProfile();
      if (profile !== null) {
        setUser(profile);
        // await fetchAdditionalUserData();
        setIsAuthenticated(true);
        localStorage.setItem("fingerprint", "true");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error by setting isAuthenticated to false
        setIsAuthenticated(false);
        console.log("User is not authenticated");
      } else {
        console.error("Failed to fetch user profile", error);
      }
    }
  };

  const login = async (credentials: LoginCredentials) => {
    const { data } = await loginUser(credentials);
    const userData = data.user;
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("fingerprint", "true");
    navigate("/");
  };

  const register = async (formData: RegisterFormData) => {
    await registerUser(formData);
    navigate("/verify");
  };

  const logout = async () => {
    try {
      await logoutUser(); // Ensure backend logs out the user
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Clear user data and reset authentication state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("fingerprint");
      resetRefreshState(); // Clear any pending requests and reset refresh state
      navigate("/");
    }
  };

  const verifyEmail = async (otp: string) => {
    await verifyEmailOtp(otp);
    setUser((prev) => ({ ...prev!, is_email_verified: true }));
  };

  const verifyPhone = async (otp: string) => {
    await verifyPhoneOtp(otp);
    setUser((prev) => ({ ...prev!, is_phone_verified: true }));
  };

  const updateUser = async (updatedUser: Partial<AuthUser>) => {
    try {
      const updatedProfile = await patchUserProfile(updatedUser);
      setUser(updatedProfile);
    } catch (error: any) {
      console.error("Error updating user:", error);
      alert("Failed to update user profile. Please try again.");
    }
  };

  const fetchAdditionalUserData = async () => {
    try {
      const [payments, programs, badges] = await Promise.allSettled([
        MyPayments(),
        MyPrograms(),
        MyBadges(),
      ]);
      if (programs.status === "fulfilled") {
        console.log("My Events:", programs.value);
      } else {
        console.error("Error fetching events:", programs.reason);
      }

      setUser((prev) =>
        prev
          ? {
              ...prev,
              payments: payments.status === "fulfilled" ? payments.value : [],
              programs: programs.status === "fulfilled" ? programs.value : [],
              badges: badges.status === "fulfilled" ? badges.value : [],
            }
          : null
      );
    } catch (error) {
      console.error("Failed to fetch additional user data:", error);
    }
  };

  const registerForEvent = async (data: RegisterEventData) => {
    await registerForEvent(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        fetchProfile,
        logout,
        verifyEmail,
        verifyPhone,
        resendEmailOtp,
        resendPhoneOtp,
        updateUser,
        fetchAdditionalUserData,
        registerForEvent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
