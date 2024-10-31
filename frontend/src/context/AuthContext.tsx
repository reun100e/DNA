import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUser, LoginCredentials, RegisterFormData } from '../types/auth.types';
import { loginUser, registerUser, fetchUserProfile, logoutUser, verifyEmailOtp, verifyPhoneOtp, resendEmailOtp, resendPhoneOtp, patchUserProfile } from '../services/authService';

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
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile().catch(() => logout()); // Logout on failure to fetch latest user data on app load.
  }, []);

  const fetchProfile = async () => {
    try {
      const profile = await fetchUserProfile();
      setUser(profile);
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to fetch user profile', error);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    const { data } = await loginUser(credentials);
    const userData = data.user;
    setUser(userData);
    console.log(userData);
    setIsAuthenticated(true);
    await fetchProfile(); // Ensure fresh data after login.
    navigate('/dashboard');
  };

  const register = async (formData: RegisterFormData) => {
    const { data } = await registerUser(formData);
    const userData = data.user;
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/verify');
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const verifyEmail = async (otp: string) => {
    await verifyEmailOtp(otp);
    setUser((prev) => ({ ...prev!, is_email_verified: true }));
  };

  const verifyPhone = async (otp: string) => {
    await verifyPhoneOtp(otp);
    setUser((prev) => ({ ...prev!, is_phone_verified: true }));
    navigate('/dashboard');
  };

  const updateUser = async (updatedUser: Partial<AuthUser>) => {
    try {
      // Send update request to the backend
      const updatedProfile = await patchUserProfile(updatedUser);

      // If successful, update the React state with the new user profile
      setUser(updatedProfile);
    } catch (error: any) {
      console.error('Error updating user:', error);
      alert('Failed to update user profile. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, fetchProfile, logout, verifyEmail, verifyPhone, resendEmailOtp, resendPhoneOtp, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
