import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'AI-Powered Resume Builder',
    description: 'Create professional resumes in minutes with our advanced AI technology.',
    icon: '🤖'
  },
  {
    title: 'Professional Templates',
    description: 'Choose from a wide range of ATS-friendly templates designed by experts.',
    icon: '📝'
  },
  {
    title: 'Real-Time Preview',
    description: 'See changes instantly as you edit your resume.',
    icon: '👀'
  },
  {
    title: 'Easy Export',
    description: 'Download your resume in multiple formats including PDF and Word.',
    icon: '📤'
  }
];

const Features = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Features that Set Us Apart
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to create a professional resume that stands out
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
