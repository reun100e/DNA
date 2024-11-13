import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthUser,
  LoginCredentials,
  RegisterFormData,
} from "../types/auth.types";
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchUserMe,
  fetchUserProfile,
  patchUserProfile,
} from "../services/authService";
import { resetRefreshState } from "../utils/refreshUtils";

interface AuthContextProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean; // New loading state
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  fetchUserProfile: () => Promise<AuthUser>;
  updateUser: (updatedUser: Partial<AuthUser>) => Promise<void>;
  baseUrl: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const navigate = useNavigate();

  useEffect(() => {
    const fingerprint = localStorage.getItem("fingerprint");
    if (fingerprint) {
      fetchUser();
    } else {
      setLoading(false); // If no fingerprint, stop loading
    }
  }, []);

  const fetchUser = async () => {
    try {
      const me = await fetchUserMe();
      if (me !== null) {
        setUser(me);
        setIsAuthenticated(true);
        localStorage.setItem("fingerprint", "true");
      } else {
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
        console.log("User is not authenticated");
        logout();
      } else {
        console.error("Failed to fetch user profile", error);
        logout();
      }
    } finally {
      setLoading(false); // Set loading to false once the authentication check is done
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const { data } = await loginUser(credentials);
      const userData = data.user;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("fingerprint", "true");
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const register = async (formData: RegisterFormData) => {
    try {
      await registerUser(formData);
      navigate("/verify");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("fingerprint");
      resetRefreshState();
      await logoutUser();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      navigate("/");
    }
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

  const handleFetchUserProfile = useCallback(async () => {
    const userProfile = await fetchUserProfile();
    setUser(userProfile);
    return userProfile;
  }, []);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        fetchUser,
        logout,
        updateUser,
        baseUrl,
        fetchUserProfile: handleFetchUserProfile,
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
