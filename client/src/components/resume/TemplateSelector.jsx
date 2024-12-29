import React from 'react';
import { motion } from 'framer-motion';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import { useNavigate } from 'react-router-dom';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    component: ModernTemplate,
    thumbnail: '/templates/modern.png',
    description: 'Clean and contemporary design with a focus on readability',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    component: MinimalTemplate,
    thumbnail: '/templates/minimal.png',
    description: 'Simple and elegant layout that lets your content shine',
  },
  {
    id: 'professional',
    name: 'Professional',
    component: ProfessionalTemplate,
    thumbnail: '/templates/professional.png',
    description: 'Traditional format ideal for corporate and business roles',
  },
  {
    id: 'creative',
    name: 'Creative',
    component: CreativeTemplate,
    thumbnail: '/templates/creative.png',
    description: 'Bold and innovative design for creative professionals',
    premium: true,
  },
  {
    id: 'executive',
    name: 'Executive',
    component: ExecutiveTemplate,
    thumbnail: '/templates/executive.png',
    description: 'Sophisticated layout perfect for senior positions',
    premium: true,
  },
];

const TemplateSelector = ({ selectedTemplate, onSelect, subscription }) => {
  const isPro = subscription?.type === 'pro';
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-lg overflow-hidden border-2 cursor-pointer ${
              selectedTemplate === template.id
                ? 'border-primary-500'
                : 'border-gray-200'
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
            <div className="aspect-w-4 aspect-h-3 bg-gray-100">
              <img
                src={template.thumbnail}
                alt={template.name}
                className="object-cover"
              />
            </div>

            {/* Template Info */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {template.name}
                </h3>
                {template.premium && (
                  <span className="px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">{template.description}</p>
            </div>

            {/* Premium Lock Overlay */}
            {template.premium && !isPro && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <p className="text-sm font-medium">
                    Upgrade to Pro to unlock
                  </p>
                </div>
              </div>
            )}

            {/* Selected Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
