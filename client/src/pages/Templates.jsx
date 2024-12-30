import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: 'Modern',
      description: 'Clean and contemporary design perfect for tech and creative professionals.',
      image: 'https://d.novoresume.com/images/doc/modern-resume-template.png',
      fallback: 'https://dummyimage.com/600x800/1e40af/ffffff.jpg&text=Modern+Template',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Professional',
      description: 'Traditional layout ideal for corporate and business roles.',
      image: 'https://d.novoresume.com/images/doc/professional-resume-template.png',
      fallback: 'https://dummyimage.com/600x800/1e40af/ffffff.jpg&text=Professional+Template',
      color: 'gray'
    },
    {
      id: 3,
      name: 'Creative',
      description: 'Unique design that helps you stand out in creative industries.',
      image: 'https://d.novoresume.com/images/doc/creative-resume-template.png',
      fallback: 'https://dummyimage.com/600x800/1e40af/ffffff.jpg&text=Creative+Template',
      color: 'purple'
    },
    {
      id: 4,
      name: 'Minimal',
      description: 'Simple and elegant design that puts your content first.',
      image: 'https://cdn.prod.website-files.com/5e9b599e716f9d94b6c84f43/6069fc581e21c75758eeaf2b_minimalist-resume-template-format.png',
      fallback: 'https://dummyimage.com/600x800/1e40af/ffffff.jpg&text=Minimal+Template',
      color: 'green'
    },
    {
      id: 5,
      name: 'Executive',
      description: 'Sophisticated design for senior positions and leadership roles.',
      image: 'https://d.novoresume.com/images/doc/executive-resume-template.png',
      fallback: 'https://dummyimage.com/600x800/1e40af/ffffff.jpg&text=Executive+Template',
      color: 'indigo'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative pt-[133%] bg-gray-50 rounded-t-lg overflow-hidden">
                <img
                  src={template.image}
                  alt={`${template.name} Resume Template`}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = template.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name} Template
                </h3>
                <p className="text-sm text-gray-600 mb-4 min-h-[48px]">
                  {template.description}
                </p>
                <div className="flex space-x-3">
                  <Link
                    to={`/register?template=${template.name.toLowerCase()}`}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    Use Template
                  </Link>
                  <button
                    onClick={() => window.open(`/preview/${template.name.toLowerCase()}`, '_blank')}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
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
          className="text-center mt-12"
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
