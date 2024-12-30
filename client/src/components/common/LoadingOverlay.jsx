import React from 'react';
import { motion } from 'framer-motion';

const LoadingOverlay = ({ isLoading, message = 'Loading...', children }) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-lg shadow-xl">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-gray-700 font-medium"
          >
            {message}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingOverlay;
