import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineSparkles, HiOutlineStar } from 'react-icons/hi';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    //component: ModernTemplate,
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
    description: 'Clean and contemporary design with a focus on readability',
    features: ['Clean Layout', 'Modern Typography', 'Skill Bars', 'Project Showcase']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    //component: MinimalTemplate,
    thumbnail: 'https://images.unsplash.com/photo-1626197031507-c17099753214?q=80&w=2070&auto=format&fit=crop',
    description: 'Simple and elegant layout that lets your content shine',
    features: ['Minimalist Design', 'Focus on Content', 'Easy to Read', 'Perfect for Tech']
  },
  {
    id: 'professional',
    name: 'Professional',
    //component: ProfessionalTemplate,
    thumbnail: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=2074&auto=format&fit=crop',
    description: 'Traditional format ideal for corporate and business roles',
    features: ['Professional Look', 'Traditional Format', 'Achievement Focus', 'Industry Standard']
  },
  {
    id: 'creative',
    name: 'Creative',
    //component: CreativeTemplate,
    thumbnail: 'https://images.unsplash.com/photo-1574618625290-902d0640a3e6?q=80&w=2074&auto=format&fit=crop',
    description: 'Bold and innovative design for creative professionals',
    features: ['Creative Layout', 'Portfolio Section', 'Color Customization', 'Visual Impact'],
    premium: true,
  },
  {
    id: 'executive',
    name: 'Executive',
    //component: ExecutiveTemplate,
    thumbnail: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop',
    description: 'Sophisticated layout perfect for senior positions',
    features: ['Executive Style', 'Leadership Focus', 'Achievement Metrics', 'Premium Look'],
    premium: true,
  },
];

const TemplateSelector = ({ selectedTemplate, onSelect, subscription }) => {
  const isPro = subscription?.type === 'pro';
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Template</h2>
        {!isPro && (
          <button
            onClick={() => navigate('/subscription')}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full text-sm font-medium hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
          >
            <HiOutlineSparkles className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-primary-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            onClick={() => {
              if (!template.premium || isPro) {
                onSelect(template.id);
              } else {
                navigate('/subscription');
              }
            }}
          >
            {/* Template Preview */}
            <div className="relative w-full h-48">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 bg-primary-500 bg-opacity-10 flex items-center justify-center">
                  <div className="bg-primary-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    Selected Template
                  </div>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  {template.name}
                  {template.premium && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
                      <HiOutlineStar className="w-3 h-3 mr-1" />
                      Premium
                    </span>
                  )}
                </h3>
              </div>
              <p className="text-sm text-gray-500 mb-3">{template.description}</p>
              
              {/* Features List */}
              <div className="space-y-1">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Lock Overlay */}
            {template.premium && !isPro && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                <div className="text-center text-white p-4">
                  <HiOutlineLockClosed className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium mb-2">Premium Template</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/subscription');
                    }}
                    className="inline-flex items-center px-3 py-1.5 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;