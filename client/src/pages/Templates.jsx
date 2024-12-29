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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates. Each template is crafted to help you stand out and make a lasting impression.
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                <img
                  src={template.image}
                  alt={template.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Template+Preview';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name} Template
                </h3>
                <p className="text-gray-600 mb-4">
                  {template.description}
                </p>
                <div className="flex space-x-4">
                  <Link
                    to="/register"
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    Use Template
                  </Link>
                  <button
                    onClick={() => window.open(`/preview/${template.name.toLowerCase()}`, '_blank')}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
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
          className="text-center mt-16"
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
