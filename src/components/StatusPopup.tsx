import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface StatusPopupProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const StatusPopup: React.FC<StatusPopupProps> = ({ message, type, onClose }) => {
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto-close after 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const popupClasses = type === 'success'
    ? 'bg-emerald-600'
    : 'bg-red-600';

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className={`fixed top-5 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-xl text-white z-[100] flex items-center space-x-3 ${popupClasses}`}
    >
      {type === 'success' ? (
        <CheckCircle className="h-6 w-6" />
      ) : (
        <XCircle className="h-6 w-6" />
      )}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default StatusPopup;