import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Templates = () => {
  const templates = [
    {
      name: 'Modern',
      description: 'Clean and contemporary design perfect for tech and creative professionals.',
      image: '/templates/modern.png',
    },
    {
      name: 'Professional',
      description: 'Traditional layout ideal for corporate and business roles.',
      image: '/templates/professional.png',
    },
    {
      name: 'Creative',
      description: 'Unique design that helps you stand out in creative industries.',
      image: '/templates/creative.png',
    },
    {
      name: 'Minimal',
      description: 'Simple and elegant design that puts your content first.',
      image: '/templates/minimal.png',
    },
    {
      name: 'Executive',
      description: 'Sophisticated design for senior positions and leadership roles.',
      image: '/templates/executive.png',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Professional Resume Templates
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates. Each template is crafted to help you stand out and make a lasting impression.
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative pt-[66%] bg-gray-100">
                <img
                  src={template.image}
                  alt={template.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Template+Preview';
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name} Template
                </h3>
                <p className="text-sm text-gray-600 mb-4 min-h-[40px]">
                  {template.description}
                </p>
                <div className="flex space-x-3">
                  <Link
                    to="/register"
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    Use Template
                  </Link>
                  <button
                    onClick={() => window.open(`/preview/${template.name.toLowerCase()}`, '_blank')}
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Create Your Professional Resume?
          </h2>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Get Started Free
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;
