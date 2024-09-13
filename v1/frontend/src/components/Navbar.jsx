import React, { useState } from "react";
import DIIMUN from "./DIIMUN";
import "../styles/Navbar.css";
import "../styles/Burger.css";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Navbar() {
  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [navMenu, setNavMenu] = useState("navMenu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // toggle burger menu change
  const updateMenu = async () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setNavMenu("navMenu visible slideIn");
    } else {
      setBurgerClass("burger-bar unclicked");
      setNavMenu("navMenu visible slideOut");
      sleep(400).then(() => {
        setNavMenu("hidden");
      });
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
        <div>
          <DIIMUN />
        </div>
        {/* <div className={navMenu}></div> */}
      </nav>
    </>
  );
}

export default Navbar;
