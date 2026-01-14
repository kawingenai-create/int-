import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/company_logo/half_logo.webp';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    // Avoid unnecessary re-renders
    setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScrollOptimized = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollOptimized, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScrollOptimized);
    };
  }, [handleScroll]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out ${isScrolled
        ? isDark
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      {/* Mobile-first responsive container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-200 ease-out ${isScrolled ? 'h-14 sm:h-16 lg:h-20' : 'h-16 sm:h-20 lg:h-24'
            }`}
        >
          {/* Logo Section - Dark mode with visible dark glass, Light mode with white glass */}
          {/* Logo Section - Enhanced Visibility */}
          <Link
            to="/"
            className={`flex items-center space-x-2 group relative z-10 flex-shrink-0 px-3 py-2 rounded-xl transition-all duration-300 ${isDark
              ? 'bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-lg'
              : 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-md'
              }`}
          >
            <div
              className={`transition-all duration-200 ease-out ${isScrolled ? 'scale-90' : 'scale-100'
                }`}
            >
              <img
                src={logo}
                alt="Logo"
                className={`object-contain transition-all duration-200 ease-out ${isScrolled
                  ? 'h-9 w-9 sm:h-10 sm:w-10'
                  : 'h-12 w-12 sm:h-14 sm:w-14'
                  }`}
              />
            </div>

            {/* Company Name */}
            <div className="relative flex items-center min-h-[2rem] sm:min-h-[2.5rem]">
              <span
                className={`font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-200 ease-out ${isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                  } ${isDark
                    ? 'from-emerald-300 via-emerald-400 to-purple-400'
                    : 'from-purple-800 via-indigo-700 to-emerald-700'
                  }`}
                style={{
                  letterSpacing: '0.01em',
                  lineHeight: '1.3',
                  whiteSpace: 'nowrap',
                  paddingTop: '2px',
                  paddingBottom: '4px',
                  display: 'block',
                  minWidth: 'fit-content',
                }}
              >
                Integer.IO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-6">
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ease-out font-medium text-sm xl:text-base relative whitespace-nowrap ${location.pathname === item.path
                    ? isDark
                      ? 'text-emerald-400 bg-emerald-400/10'
                      : 'text-purple-600 bg-purple-600/10'
                    : isDark
                      ? 'text-gray-200 hover:text-emerald-400 hover:bg-emerald-400/5'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-600/5'
                    }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-purple-600'
                        }`}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Controls - Mobile Optimized */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Theme Toggle - Desktop */}
            <div className="hidden lg:block">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ease-out ${isDark
                  ? 'text-yellow-400 hover:bg-yellow-400/10'
                  : 'text-indigo-600 hover:bg-indigo-600/10'
                  }`}
              >
                <div className="text-lg">{isDark ? '☀️' : '🌙'}</div>
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Theme Toggle - Mobile */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 ease-out ${isDark
                  ? 'text-yellow-400 hover:bg-yellow-400/10'
                  : 'text-indigo-600 hover:bg-indigo-600/10'
                  }`}
              >
                <div className="text-lg">{isDark ? '☀️' : '🌙'}</div>
              </button>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-all duration-200 ease-out ${isDark
                  ? 'text-gray-200 hover:text-emerald-400 hover:bg-emerald-400/10'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-purple-600/10'
                  }`}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`lg:hidden overflow-hidden ${isDark ? 'bg-gray-900/95' : 'bg-white/95'
                } backdrop-blur-md`}
            >
              <div
                className={`h-px ${isDark ? 'bg-gray-700/20' : 'bg-gray-200/20'
                  }`}
              />

              <div className="py-4 space-y-1 px-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: 'easeOut',
                    }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-all duration-200 ease-out font-medium text-base ${location.pathname === item.path
                        ? isDark
                          ? 'text-emerald-400 bg-emerald-400/10'
                          : 'text-purple-600 bg-purple-600/10'
                        : isDark
                          ? 'text-gray-200 hover:text-emerald-400 hover:bg-emerald-400/5'
                          : 'text-gray-700 hover:text-purple-600 hover:bg-purple-600/5'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {location.pathname === item.path && (
                          <div
                            className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-purple-600'
                              }`}
                          />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav >
  );
};

export default Navigation;
