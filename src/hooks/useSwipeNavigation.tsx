import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SwipeNavigationConfig {
  routes: string[];
  threshold?: number;
  enabled?: boolean;
}

export const useSwipeNavigation = ({
  routes,
  threshold = 100,
  enabled = true,
}: SwipeNavigationConfig) => {
  const navigate = useNavigate();
  const location = useLocation();
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchEnd.current = null;
      touchStart.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (!touchStart.current || !touchEnd.current) return;

      const distance = touchStart.current - touchEnd.current;
      const isLeftSwipe = distance > threshold;
      const isRightSwipe = distance < -threshold;

      const currentIndex = routes.indexOf(location.pathname);

      if (isLeftSwipe && currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      }

      if (isRightSwipe && currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [location.pathname, navigate, routes, threshold, enabled]);
};
