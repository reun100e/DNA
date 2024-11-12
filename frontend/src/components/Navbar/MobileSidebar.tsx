import React, { useState } from "react";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { programs } from "./constants/programs";
import { courses } from "./constants/courses";

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
  const [isProgramsOpen, setProgramsOpen] = useState(false);
  const [isCoursesOpen, setCoursesOpen] = useState(false);

  const togglePrograms = () => setProgramsOpen(!isProgramsOpen);
  const toggleCourses = () => setCoursesOpen(!isCoursesOpen);

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
            <a
              href="/"
              className="block py-2 hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="/about"
              className="block py-2 hover:text-primary transition-colors"
            >
              Introduction to DNA
            </a>
            <a
              href="/research-hub"
              className="block py-2 hover:text-primary transition-colors"
            >
              Medical Research Hub
            </a>
            <a
              href="/marketplace"
              className="block py-2 hover:text-primary transition-colors"
            >
              Doctor’s Marketplace
            </a>

            {/* Collapsible Programs Section */}
            <div>
              <button
                onClick={togglePrograms}
                className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors"
              >
                <span>Programs</span>
                {isProgramsOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isProgramsOpen && (
                <div className="pl-4 space-y-2">
                  {programs.map((program) => (
                    <a
                      key={program.title}
                      href={program.href}
                      className="block py-2 hover:text-primary transition-colors"
                    >
                      {program.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Courses Section */}
            <div>
              <button
                onClick={toggleCourses}
                className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors"
              >
                <span>Courses</span>
                {isCoursesOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isCoursesOpen && (
                <div className="pl-4 space-y-2">
                  {courses.map((course) => (
                    <a
                      key={course.title}
                      href={course.href}
                      className="block py-2 hover:text-primary transition-colors"
                    >
                      {course.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/gallery"
              className="block py-2 hover:text-primary transition-colors"
            >
              Gallery
            </a>
            <a
              href="/contact"
              className="block py-2 hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col items-start">
          <LightDarkToggle />
          <span className="text-xs text-muted-foreground pt-1">v.0.1</span>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
