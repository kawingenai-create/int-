import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'emerald' | 'purple' | 'blue' | 'pink' | 'indigo' | 'cyan';
  noTilt?: boolean;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'emerald',
  noTilt = false 
}) => {
  const { isDark } = useTheme();

  const glowColors = {
    emerald: isDark ? 'shadow-emerald-500/15' : 'shadow-emerald-300/25',
    purple: isDark ? 'shadow-purple-500/15' : 'shadow-purple-300/25',
    blue: isDark ? 'shadow-blue-500/15' : 'shadow-blue-300/25',
    pink: isDark ? 'shadow-pink-500/15' : 'shadow-pink-300/25',
    indigo: isDark ? 'shadow-indigo-500/15' : 'shadow-indigo-300/25',
    cyan: isDark ? 'shadow-cyan-500/15' : 'shadow-cyan-300/25',
  };

  return (
    <motion.div
      className={`
        relative p-6 rounded-xl backdrop-blur-lg border transition-all duration-300
        ${isDark 
          ? 'bg-gray-900/60 border-gray-700/50 hover:bg-gray-800/70' 
          : 'bg-white/80 border-gray-300/50 hover:bg-white/90'
        }
        hover:shadow-xl ${glowColors[glowColor]}
        ${className}
      `}
      whileHover={noTilt ? { scale: 1.015 } : { 
        scale: 1.015, 
        rotateX: 3, 
        rotateY: 3,
      }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
    >
      {/* Enhanced glow effect */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 hover:opacity-80 transition-opacity duration-300
        ${isDark 
          ? 'bg-gradient-to-r from-transparent via-gray-600/8 to-transparent' 
          : 'bg-gradient-to-r from-transparent via-gray-200/15 to-transparent'
        }
      `} />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default InteractiveCard;