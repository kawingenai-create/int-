import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageVisit, updateTimeSpent } from '../lib/supabase';

const Analytics: React.FC = () => {
  const location = useLocation();
  const startTime = useRef<number>(Date.now());
  const currentVisitId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Set start time for new page
    startTime.current = Date.now();

    // Get or create visitor ID
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor_id', visitorId);
    }

    const pagePath = location.pathname;

    // 2. Track the new visit and get its ID
    const initVisit = async () => {
      const id = await trackPageVisit(pagePath, visitorId!);
      if (id) {
        currentVisitId.current = id;
      }
    };
    initVisit();

    // 3. Define the cleanup function to update duration
    const handleExit = () => {
      if (currentVisitId.current) {
        const duration = Math.floor((Date.now() - startTime.current) / 1000); // seconds
        // Use navigator.sendBeacon if possible for reliability, but Supabase SDK is fetch-based.
        // We'll standard fetch here, but note that modern browsers might cut it off.
        // For this assignment, we use the standard SDK function we defined.
        updateTimeSpent(currentVisitId.current, duration);
      }
    };

    // Handle standard unmount/navigation
    return () => {
      handleExit();
      currentVisitId.current = null; // Reset for next effect
    };
  }, [location.pathname]);

  // Handle browser tab close / refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentVisitId.current) {
        const duration = Math.floor((Date.now() - startTime.current) / 1000);
        updateTimeSpent(currentVisitId.current, duration);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return null;
};

export default Analytics;