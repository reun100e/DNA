import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";

export const LogInOut = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Button>
      <a className="logout-btn" onClick={handleClick}>
        {isAuthenticated ? "Logout" : "Login"}
      </a>
    </Button>
  );
};
