import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Examples = () => {
  const navigate = useNavigate();
  
  const templates = [
    {
      id: 'modern',
      name: 'Modern Template',
      description: 'Clean and contemporary design with a focus on readability',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
      features: ['Clean Layout', 'Modern Typography', 'Skill Bars', 'Project Showcase'],
      bestFor: 'Tech professionals, designers, and digital creatives'
    },
    {
      id: 'minimal',
      name: 'Minimal Template',
      description: 'Simple and elegant layout that lets your content shine',
      image: 'https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=2070&auto=format&fit=crop',
      features: ['Minimalist Design', 'Focus on Content', 'Easy to Read', 'Perfect for Tech'],
      bestFor: 'Software developers, startups, and modern professionals'
    },
    {
      id: 'professional',
      name: 'Professional Template',
      description: 'Traditional format ideal for corporate and business roles',
      image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=2074&auto=format&fit=crop',
      features: ['Professional Look', 'Traditional Format', 'Achievement Focus', 'Industry Standard'],
      bestFor: 'Business executives, managers, and corporate professionals'
    },
    {
      id: 'creative',
      name: 'Creative Template',
      description: 'Stand out with a unique and eye-catching design',
      image: 'https://images.unsplash.com/photo-1611299106168-77e6ed141892?q=80&w=2074&auto=format&fit=crop',
      features: ['Creative Layout', 'Portfolio Section', 'Visual Elements', 'Personal Branding'],
      bestFor: 'Artists, designers, and creative professionals'
    }
  ];

  const handleTemplateClick = (templateId) => {
    navigate(`/preview/${templateId}`);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Resume Templates
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose from our professionally designed templates to create your perfect resume
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Best For:</h4>
                  <p className="text-gray-700">{template.bestFor}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Key Features:</h4>
                  {template.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-gray-600">
                      <svg
                        className="h-4 w-4 text-green-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleTemplateClick(template.id)}
                  className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                >
                  Use This Template
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 bg-gray-50 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Create Your Resume?</h3>
          <p className="text-gray-600 mb-6">
            Choose your template and create a professional resume in minutes
          </p>
          <button
            onClick={() => navigate('/resume-builder')}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Start Building Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Examples;
