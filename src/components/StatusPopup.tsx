import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface StatusPopupProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const StatusPopup: React.FC<StatusPopupProps> = ({ message, type, onClose }) => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-xl shadow-2xl p-6 sm:p-8 text-center max-w-sm w-full`}
      >
        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${type === 'success'
            ? 'bg-emerald-500/20'
            : 'bg-red-500/20'
          }`}>
          {type === 'success' ? (
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          ) : (
            <XCircle className="h-8 w-8 text-red-500" />
          )}
        </div>

        <p className={`text-lg font-medium mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {message}
        </p>

        <button
          onClick={onClose}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${type === 'success'
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
        >
          OK
        </button>
      </motion.div>
    </div>
  );
};

export default StatusPopup;