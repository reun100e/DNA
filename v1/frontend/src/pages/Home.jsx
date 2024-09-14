import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/Hero_img.png";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const login_btn = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div>
      <div className="Hero-heading">
        <h1>
          <span id="c">D</span>OCTORS <span id="c">I</span>NTEGRATED{" "}
          <span id="c">I</span>NTERNATIONAL
        </h1>
        <h1>
          <span id="d">M</span>ODEL <span id="d">U</span>NITED{" "}
          <span id="d">N</span>ATIONS
        </h1>
        <p>THREE committees, TWO topics, ONE day</p>
        <p onClick={login_btn}>Register Today</p>
      </div>
      <div>
        <img className="hero_img" src={img} alt="Hero image of DIIMUN" />
      </div>
      <button>Contact Organizers</button>
    </div>
  );
}

export default Home;
