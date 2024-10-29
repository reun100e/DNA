import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/navbar.css";

import { LogInOut } from "../Auth/LogInOut";

type MenuItem = {
  label: string;
  link?: string;
  submenu?: MenuItem[];
};

const menuData: MenuItem[] = [
  { label: "Home", link: "/" },
  {
    label: "Events",
    link: "/events",
    submenu: [
      { label: "DIIMUN", link: "/diimun" },
      { label: "Medical Conference", link: "/med-conf" },
    ],
  },
  {
    label: "Workshops",
    link: "/workshop",
    submenu: [
      {
        label: "Workshop on effective doctor patient communications",
        link: "/workshop",
      },
      { label: "MUN Workshop", link: "/workshop" },
    ],
  },
  {
    label: "Gallery",
    link: "/gallery",
    submenu: [{ label: "2021" }, { label: "2022" }],
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  console.log("Navbar auth: " + isAuthenticated)


  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle
  const [activeMenu, setActiveMenu] = useState<number | null>(null); // For open desktop submenus
  const navbarRef = useRef<HTMLDivElement>(null);

  // Close all menus if user clicks outside the navbar
  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setActiveMenu(null);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen); // Mobile menu toggle

  // Desktop: Toggle submenu on hover
  const handleHover = (index: number) => setActiveMenu(index);

  // Mobile: Toggle submenu on click
  const toggleSubMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    const submenu = e.currentTarget.querySelector("ul");
    if (submenu) {
      submenu.style.display =
        submenu.style.display === "block" ? "none" : "block";
    }
  };

  const renderMenu = (items: MenuItem[], depth = 0) =>
    items.map((item, index) => (
      <li
        key={`${item.label}-${index}`}
        className={`navbar-item ${item.submenu ? "has-submenu" : ""}`}
        onClick={toggleSubMenu}
        onMouseEnter={() => handleHover(index)} // Desktop hover behavior
        onMouseLeave={() => setActiveMenu(null)}
        style={{ paddingLeft: depth * 20 + "px" }} // Indentation for mobile
      >
        <a href={item.link || "#"} className="navbar-link">
          {item.label}
        </a>
        {item.submenu && (
          <ul
            className={`submenu depth-${depth} ${
              activeMenu === index ? "show" : ""
            }`}
          >
            {renderMenu(item.submenu, depth + 1)}
          </ul>
        )}
      </li>
    ));

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <button className="navbar-toggle clean-btn" onClick={toggleMenu}>
          <span className={`burger ${menuOpen ? "opened" : "closed"}`} />
          <span className={`burger ${menuOpen ? "opened" : "closed"}`} />
          <span className={`burger ${menuOpen ? "opened" : "closed"}`} />
        </button>

        <a href="/" className="navbar-logo">
          DNA
        </a>
        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          {renderMenu(menuData)}
        </ul>
        <div>
          <div>{isAuthenticated ? (<><li><span>Welcome, {user?.first_name}</span></li></>) : (<></>)}</div>
          <LogInOut />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
