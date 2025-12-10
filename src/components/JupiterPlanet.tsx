import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SaturnPlanet: React.FC = () => {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const planetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      const factor = isMobile ? 0.7 : 1; // ~30% reduced on mobile
      setRotation({
        x: deltaY * 20 * factor,
        y: deltaX * 30 * factor
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isMobile) return null;

  return (
    <div className={`fixed top-1/2 right-10 transform -translate-y-1/2 z-0 pointer-events-none ${
      isDark ? 'opacity-50 lg:opacity-60' : 'opacity-70 lg:opacity-80'
    }`}>
      <motion.div
        ref={planetRef}
        className="relative w-64 h-64 lg:w-80 lg:h-80 select-none"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isDark ? 0.4 : 0.8, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Saturn Core with realistic appearance */}
        <div className={`absolute inset-0 rounded-full overflow-hidden shadow-2xl ${
          isDark 
            ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600' 
            : 'bg-gradient-to-br from-amber-500 via-orange-600 to-red-700'
        }`}>
          
          {/* Saturn's characteristic bands - More realistic */}
          <div className="absolute inset-0 rounded-full">
            {/* Equatorial Zone (light) */}
            <div className={`absolute top-8 left-0 right-0 h-6 bg-gradient-to-r from-transparent to-transparent transform rotate-1 ${
              isDark ? 'via-yellow-200/50' : 'via-amber-300/70'
            }`} />
            <div className={`absolute top-16 left-0 right-0 h-4 bg-gradient-to-r from-transparent to-transparent transform -rotate-1 ${
              isDark ? 'via-orange-100/40' : 'via-orange-200/60'
            }`} />
            
            {/* North Equatorial Belt (dark) */}
            <div className={`absolute top-22 left-0 right-0 h-3 bg-gradient-to-r from-transparent to-transparent ${
              isDark ? 'via-orange-800/60' : 'via-red-800/80'
            }`} />
            
            {/* North Tropical Zone (light) */}
            <div className={`absolute top-26 left-0 right-0 h-8 bg-gradient-to-r from-transparent to-transparent transform rotate-1 ${
              isDark ? 'via-yellow-300/45' : 'via-amber-400/65'
            }`} />
            
            {/* North Temperate Belt (dark) */}
            <div className={`absolute top-36 left-0 right-0 h-4 bg-gradient-to-r from-transparent to-transparent ${
              isDark ? 'via-orange-900/55' : 'via-red-900/75'
            }`} />
            
            {/* South Equatorial Belt (dark) */}
            <div className={`absolute top-48 left-0 right-0 h-10 bg-gradient-to-r from-transparent to-transparent transform -rotate-1 ${
              isDark ? 'via-orange-800/65' : 'via-red-800/85'
            }`} />
            
            {/* South Tropical Zone (light) */}
            <div className={`absolute top-60 left-0 right-0 h-6 bg-gradient-to-r from-transparent to-transparent ${
              isDark ? 'via-yellow-200/50' : 'via-amber-300/70'
            }`} />
            
            {/* South Temperate Belt (dark) */}
            <div className={`absolute top-68 left-0 right-0 h-5 bg-gradient-to-r from-transparent to-transparent transform rotate-1 ${
              isDark ? 'via-orange-800/60' : 'via-red-800/80'
            }`} />
            
            {/* Additional subtle bands */}
            <div className={`absolute top-76 left-0 right-0 h-3 bg-gradient-to-r from-transparent to-transparent ${
              isDark ? 'via-yellow-300/35' : 'via-amber-400/55'
            }`} />
            <div className={`absolute top-80 left-0 right-0 h-2 bg-gradient-to-r from-transparent to-transparent ${
              isDark ? 'via-orange-700/50' : 'via-red-700/70'
            }`} />
          </div>
          
          {/* Saturn's hexagonal storm at north pole */}
          <motion.div 
            className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12"
            style={{
              background: isDark 
                ? 'conic-gradient(from 0deg, #dc2626, #991b1b, #7f1d1d, #dc2626)'
                : 'conic-gradient(from 0deg, #ef4444, #dc2626, #991b1b, #ef4444)',
              clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Smaller storm systems */}
          <div className={`absolute top-20 left-12 w-6 h-4 rounded-full transform rotate-12 ${
            isDark ? 'bg-orange-700/70' : 'bg-red-700/90'
          }`} />
          <div className={`absolute top-32 left-20 w-4 h-3 rounded-full transform -rotate-8 ${
            isDark ? 'bg-yellow-600/60' : 'bg-amber-600/80'
          }`} />
          <div className={`absolute top-56 left-12 w-8 h-5 rounded-full transform rotate-20 ${
            isDark ? 'bg-orange-600/60' : 'bg-red-600/80'
          }`} />
          <div className={`absolute bottom-20 right-24 w-5 h-4 rounded-full transform -rotate-15 ${
            isDark ? 'bg-yellow-700/70' : 'bg-amber-700/90'
          }`} />
          
          {/* Atmospheric turbulence effects */}
          <div className="absolute inset-0 rounded-full">
            <div className={`absolute top-12 left-6 w-10 h-1 rounded-full transform rotate-45 ${
              isDark ? 'bg-yellow-400/30' : 'bg-amber-500/50'
            }`} />
            <div className={`absolute top-40 right-10 w-6 h-1 rounded-full transform -rotate-30 ${
              isDark ? 'bg-orange-300/35' : 'bg-orange-400/55'
            }`} />
            <div className={`absolute bottom-24 left-16 w-8 h-1 rounded-full transform rotate-60 ${
              isDark ? 'bg-yellow-400/25' : 'bg-amber-500/45'
            }`} />
          </div>
          
          {/* Enhanced Atmospheric Glow */}
          <div className={`absolute -inset-8 rounded-full blur-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-yellow-400/20 via-transparent to-orange-400/20' 
              : 'bg-gradient-to-br from-amber-500/40 via-transparent to-orange-500/40'
          }`} />
        </div>

        {/* Enhanced Saturn Ring System - Multiple realistic rings */}
        {/* A Ring (outermost visible ring) */}
        <motion.div 
          className={`absolute top-1/2 left-1/2 w-[500px] h-[500px] border-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
            isDark 
              ? 'border-yellow-300/60'
              : 'border-amber-600/90'
          }`}
          style={{ 
            transform: `translate(-50%, -50%) rotateX(75deg) rotateY(${rotation.y * 0.4}deg)`,
            transformStyle: 'preserve-3d',
            boxShadow: isDark 
              ? '0 0 30px rgba(253, 224, 71, 0.3)' 
              : '0 0 30px rgba(217, 119, 6, 0.6)'
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: isMobile ? 3.9 : 3, // slower on mobile
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Cassini Division (gap between A and B rings) */}
        <motion.div 
          className={`absolute top-1/2 left-1/2 w-[460px] h-[460px] border-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
            isDark 
              ? 'border-gray-600/40' 
              : 'border-gray-700/70'
          }`}
          style={{ 
            transform: `translate(-50%, -50%) rotateX(75deg) rotateY(${rotation.y * -0.3}deg)`,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: isMobile ? 3.25 : 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* B Ring (brightest ring) */}
        <motion.div 
          className={`absolute top-1/2 left-1/2 w-[420px] h-[420px] border-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
            isDark 
              ? 'border-yellow-400/80' 
              : 'border-amber-700/95'
          }`}
          style={{ 
            transform: `translate(-50%, -50%) rotateX(75deg) rotateY(${rotation.y * 0.5}deg)`,
            transformStyle: 'preserve-3d',
            boxShadow: isDark 
              ? '0 0 40px rgba(251, 191, 36, 0.4)' 
              : '0 0 40px rgba(180, 83, 9, 0.7)'
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: isMobile ? 2.6 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* C Ring (inner ring) */}
        <motion.div 
          className={`absolute top-1/2 left-1/2 w-[380px] h-[380px] border-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
            isDark 
              ? 'border-orange-400/50' 
              : 'border-orange-700/80'
          }`}
          style={{ 
            transform: `translate(-50%, -50%) rotateX(75deg) rotateY(${rotation.y * -0.6}deg)`,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: isMobile ? 2.34 : 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* D Ring (innermost ring) */}
        <motion.div 
          className={`absolute top-1/2 left-1/2 w-[340px] h-[340px] border-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
            isDark 
              ? 'border-yellow-300/30' 
              : 'border-amber-600/60'
          }`}
          style={{ 
            transform: `translate(-50%, -50%) rotateX(75deg) rotateY(${rotation.y * 0.7}deg)`,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: isMobile ? 1.95 : 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Saturn's Major Moons - Titan, Rhea, Iapetus, Dione */}
        {[
          { name: 'Titan', color: 'orange', size: 'w-3 h-3', distance: 85, speed: 0.8 },
          { name: 'Rhea', color: 'gray', size: 'w-2 h-2', distance: 75, speed: 1.2 },
          { name: 'Iapetus', color: 'gray', size: 'w-2.5 h-2.5', distance: 95, speed: 0.6 },
          { name: 'Dione', color: 'blue', size: 'w-1.5 h-1.5', distance: 65, speed: 1.5 }
        ].map((moon, i) => (
          <motion.div
            key={moon.name}
            className={`absolute ${moon.size} rounded-full ${
              moon.color === 'orange' ? (isDark ? 'bg-orange-400/80' : 'bg-orange-600/90') :
              moon.color === 'blue' ? (isDark ? 'bg-blue-300/80' : 'bg-blue-500/90') :
              (isDark ? 'bg-gray-300/80' : 'bg-gray-600/90')
            }`}
            style={{
              top: `${50 + Math.sin(Date.now() * 0.001 * moon.speed + i * 90) * moon.distance}%`,
              left: `${50 + Math.cos(Date.now() * 0.001 * moon.speed + i * 90) * moon.distance}%`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Enhanced energy field effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              `0 0 40px ${isDark ? 'rgba(251, 191, 36, 0.3)' : 'rgba(217, 119, 6, 0.6)'}`,
              `0 0 80px ${isDark ? 'rgba(251, 191, 36, 0.5)' : 'rgba(217, 119, 6, 0.8)'}`,
              `0 0 40px ${isDark ? 'rgba(251, 191, 36, 0.3)' : 'rgba(217, 119, 6, 0.6)'}`
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Ring particles effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? 'bg-yellow-400/60' : 'bg-amber-600/80'
              }`}
              style={{
                top: `${45 + Math.sin(i * 18) * 25}%`,
                left: `${45 + Math.cos(i * 18) * 25}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1.2, 0.5],
                rotate: 360,
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SaturnPlanet;