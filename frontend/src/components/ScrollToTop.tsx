import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const smoothScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    smoothScrollToTop();
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
