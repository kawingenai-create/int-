import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import SpaceBackground from './components/SpaceBackground';
import JupiterPlanet from './components/JupiterPlanet';
import Spaceship from './components/Spaceship';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppWidget from './components/WhatsAppWidget';
import Analytics from './components/Analytics';
import SEO from './components/SEO';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Products from './pages/Products';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Admin from './pages/Admin';

function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AnimatePresence mode="wait">
            {!isLoadingComplete ? (
              <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
            ) : (
              <motion.div
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="relative min-h-screen overflow-x-hidden"
              >
                <SEO />
                <Analytics />
                <SpaceBackground />
                <JupiterPlanet />
                <Spaceship />
                <Navigation />

                <main className="relative z-10">
                  <Routes future={{ v7_relativeSplatPath: true }}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/admin" element={<Admin />} />
                  </Routes>
                </main>

                <Footer />
                <ScrollToTop />
                <WhatsAppWidget />
                <CookieConsent />
              </motion.div>
            )}
          </AnimatePresence>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
