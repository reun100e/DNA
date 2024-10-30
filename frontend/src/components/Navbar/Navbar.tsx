import React, { useState, useEffect, useRef, useCallback } from "react";
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
        label: "Doctor patient communication",
        link: "/workshop",
      },
      { label: "MUN Workshop", link: "/workshop" },
    ],
  },
  { label: "Gallery", link: "/gallery", submenu: [{ label: "2021" }, { label: "2022" }] },
  { label: "Contact", link: "/contact" },
];

const Navbar: React.FC = React.memo(() => {
  const { isAuthenticated, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Close all menus if user clicks outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  const renderMenu = useCallback(
    (items: MenuItem[], depth = -1) =>
      items.map((item, index) => (
        <li
          key={`${item.label}-${index}`}
          className={`navbar-item ${item.submenu ? "has-submenu" : ""}`}
          style={{ paddingLeft: `${depth * 20}px` }} // Indent mobile submenus
        >
          <a href={item.link || "#"} className="navbar-link">
            {item.label}
          </a>
          {item.submenu ? <i className="down-arrow"></i> : ""}
          {item.submenu && (
            <ul className={`submenu depth-${depth}`}>
              {renderMenu(item.submenu, depth + 1)}
            </ul>
          )}
        </li>
      )),
    []
  );

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <button className="navbar-toggle clean-btn" onClick={toggleMenu}>
          <span className={`burger ${menuOpen ? "opened" : "closed"}`} />
          <span className={`burger ${menuOpen ? "opened" : "closed"}`} />
          <span className={`burger ${menuOpen ? "opened" : "closed"}`} />
        </button>

        <a href="/">
          <img  className="navbar-logo" src="./favicon.ico" alt="logo" />
        </a>
        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          {renderMenu(menuData)}
        </ul>
        <div className="navbar-welcome">
          {isAuthenticated && <li>Welcome, {user?.first_name}</li>}
          <LogInOut />
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
