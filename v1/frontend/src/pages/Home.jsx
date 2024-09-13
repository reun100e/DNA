import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const login_btn = (e) => {
        e.preventDefault();
        navigate("/login");
    }


  return (
    <div>
      <h1>Home</h1>
      <button onClick={login_btn}>Login</button>
    </div>
  );
}

export default Home;
