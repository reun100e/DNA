import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when the location changes.
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null; // This component does not render anything
};

export default ScrollToTop;
