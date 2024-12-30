import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UpgradeCard = ({ onClose }) => {
  const navigate = useNavigate();

  const features = [
    'Create unlimited CVs',
    'Access to premium templates',
    'Advanced analytics',
    'Priority support',
    'Export in multiple formats'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
          <p className="text-primary-100">Take your CV game to the next level</p>
        </div>

        {/* Features */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-600">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <span className="text-4xl font-bold text-gray-900">$9.99</span>
            <span className="text-gray-500">/month</span>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/subscription/upgrade')}
              className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium
                hover:bg-primary-700 transition-colors duration-200 transform hover:scale-[1.02]"
            >
              Upgrade Now
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 text-gray-600 rounded-lg font-medium
                hover:bg-gray-100 transition-colors duration-200"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UpgradeCard;
