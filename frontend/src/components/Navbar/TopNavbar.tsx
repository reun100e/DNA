import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavMenu } from "./NavMenu";
import MobileSidebar from "./MobileSidebar";
import { useAuth } from "@/context/AuthContext";
import { LogInOut } from "../Auth/LogInOut";
import UserProfileMenu from "./UserProfileMenu";
import { Logo } from "../Logo";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null); // Reference to the sidebar

  // Close sidebar if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
<nav className="bg-popover w-full max-w-screen-xl mx-auto rounded-lg shadow dark:bg-gray-900 fixed-center top-0 left-0 z-10">
<div className="w-full max-w-screen-lg mx-auto flex items-center justify-between p-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Logo className="w-12 h-12 object-contain" />
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <NavMenu />
        </nav>

        {/* Authentication Button */}
        <div className="flex gap-4">
          {isAuthenticated ? <UserProfileMenu /> : <LogInOut />}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
        sidebarRef={sidebarRef} // Pass the ref to MobileSidebar
      />
    </nav>
  );
};

export default TopNavbar;
