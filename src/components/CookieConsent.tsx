import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const CookieConsent: React.FC = () => {
  const { isDark } = useTheme();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setShowConsent(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 p-6 rounded-lg shadow-2xl border ${
            isDark 
              ? 'bg-gray-900/95 border-gray-700 backdrop-blur-lg' 
              : 'bg-white/95 border-gray-200 backdrop-blur-lg'
          }`}
        >
          <div className="flex items-start space-x-3">
            <Cookie className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Cookie Consent
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
                We use cookies to enhance your experience and analyze site traffic. 
                Your privacy is important to us.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={acceptCookies}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={declineCookies}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark 
                      ? 'text-gray-300 hover:bg-gray-800' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Decline
                </button>
              </div>
            </div>
            <button
              onClick={declineCookies}
              className={`p-1 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;