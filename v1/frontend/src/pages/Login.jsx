import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const home_btn = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <Form route="/api/token/" method="login" />
      <button onClick={home_btn}>Home</button>
    </div>
  );
}

export default Login;
