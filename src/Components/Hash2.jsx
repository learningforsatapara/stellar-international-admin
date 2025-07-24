import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Hash = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hash = location.hash;

  useEffect(() => {
    if (hash) {
      const el = document?.querySelector(hash) || null;
      const headerHeight = (() => {
        if (window.innerWidth < 992) return 48;
        if (window.innerWidth < 1200) return 70;
        return 112 - 2;
      })();

      if (el) {
        const scrollTarget = el.offsetTop - headerHeight;

        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });

        // Remove hash from URL after scroll completes
        setTimeout(() => {
          navigate(location.pathname, { replace: true });
        }, 800); // Delay matches the scroll duration (adjust if needed)
      }
    }
  }, [hash, location.pathname, navigate]);

  return null;
};

export default Hash;
