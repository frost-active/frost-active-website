import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
  const location = useLocation();
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    const pagePath = location.pathname + location.search;
    //Google Analytics Page View
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
      });
    }

    if (window.fbq) {
      // 🚫 No PageView on /reserve
      if (location.pathname !== '/reserve') {
        window.fbq('track', 'PageView');
      }

      // ✅ Fire Lead ONLY once per navigation (but allow refresh)
      if (location.pathname === '/reserve') {
        if (lastTrackedPath.current !== pagePath) {
          window.fbq('track', 'Lead');
          lastTrackedPath.current = pagePath;
        }
      }
    }

  }, [location]);
};

export default usePageTracking;