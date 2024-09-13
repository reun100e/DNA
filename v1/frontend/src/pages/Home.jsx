import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const login_btn = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div>
      <h2>DOCTORS INTEGRATED INTERNATIONAL</h2>
      <h1>MODEL UNITED NATIONS</h1>
      <p>THREE committees, TWO topics, ONE day</p>
      <button onClick={login_btn}>Register Today</button>
    </div>
  );
}

export default Home;
