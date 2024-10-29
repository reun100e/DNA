import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LogInOut = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <a className="logout-btn" onClick={handleClick}>
        {isAuthenticated ? "Logout" : "Login"}
      </a>
    </div>
  );
};
