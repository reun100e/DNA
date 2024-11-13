import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { committees } from "./constants/committees";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  sidebarRef: React.RefObject<HTMLDivElement>; // Add the ref as a prop
}

const MobileSidebar: React.FC<SidebarProps> = ({
  isOpen,
  closeSidebar,
  sidebarRef,
}) => {
  const [isCoursesOpen, setCoursesOpen] = useState(false);

  const toggleCourses = () => setCoursesOpen(!isCoursesOpen);

  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 bg-black/50" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => e.stopPropagation()} // Prevent click propagation to outer elements
    >
      <div
        ref={sidebarRef} // Attach the ref to the sidebar div
        className={`fixed top-0 left-0 w-64 h-full p-6 shadow-lg bg-card text-foreground dark:bg-popover dark:text-popover-foreground
          transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button
          className="text-foreground mb-4 hover:text-primary transition-colors"
          onClick={closeSidebar}
          aria-label="Close Sidebar"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[80vh] space-y-4">
          <nav>
            <div
              onClick={() => {closeSidebar(); navigate("/")}}
              className="block py-5 hover:text-primary transition-colors"
            >
              Home
            </div>

            <div
              onClick={() => {closeSidebar();navigate("/diimun")}}
              className="block py-5 hover:text-primary transition-colors"
            >
              DIIMUN
            </div>


            {/* Collapsible Courses Section */}
            <div>
              <button
                onClick={toggleCourses}
                className="flex items-center justify-between w-full py-5 hover:text-primary transition-colors"
              >
                <span>Committees</span>
                {isCoursesOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isCoursesOpen && (
                <div className="pl-4 space-y-2">
                  {committees.map((component) => (
                    <div
                      key={component.title}
                      onClick={() => {closeSidebar();navigate(component.link)}}
                      className="block py-2 hover:text-primary transition-colors"
                    >
                      {component.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              onClick={() => {closeSidebar();navigate("/gallery")}}
              className="block py-5 hover:text-primary transition-colors"
            >
              Gallery
            </div>

            <div
              onClick={() => {closeSidebar();navigate("/about")}}
              className="block py-5 hover:text-primary transition-colors"
            >
              About Us
            </div>

            <div
              onClick={() => {closeSidebar();navigate("/contact")}}
              className="block py-5 hover:text-primary transition-colors"
            >
              Contact
            </div>
          </nav>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col items-start">
          <LightDarkToggle />
          <span className="text-xs text-muted-foreground pt-1">v.0.2 alpha</span>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
