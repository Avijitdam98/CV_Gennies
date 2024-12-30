import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: '₹0',
      interval: 'forever',
      features: [
        'Create 1 resume',
        'Basic templates',
        'PDF export',
        'Essential customization',
        'Email support'
      ],
      limitations: [
        'No premium templates',
        'Limited customization',
        'No analytics',
        'No priority support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '₹499',
      interval: 'month',
      features: [
        'Unlimited resumes',
        'All premium templates',
        'Multiple export formats',
        'Advanced customization',
        'Resume analytics',
        'Priority support',
        'Remove watermark',
        'Custom domain sharing'
      ],
      popular: true
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="ml-2 text-gray-500">/{plan.interval}</span>
                </div>

                {/* Features */}
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Limitations for free plan */}
                {plan.limitations && (
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Limitations:</h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center text-gray-500">
                          <span className="h-5 w-5 mr-3 flex items-center justify-center">×</span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <div className="mt-8">
                  <a
                    href={plan.id === 'pro' ? 'https://rzp.io/rzp/KyTwxBLi' : '#'}
                    className={`w-full inline-flex justify-center py-3 px-6 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      plan.id === 'pro'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {plan.id === 'pro' ? 'Upgrade Now' : 'Get Started'}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-6">Trusted by professionals worldwide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Templates</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Secure</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
