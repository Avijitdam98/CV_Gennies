import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

const Subscription = () => {
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
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
      price: 499,
      currency: 'INR',
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
      ]
    }
  ];

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      window.location.href = 'https://rzp.io/rzp/KyTwxBLi';
    } catch (error) {
      console.error('Error redirecting to payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-xl text-gray-500"
          >
            Select the perfect plan for your resume building needs
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 ${
                plan.id === 'pro' ? 'relative' : ''
              }`}
            >
              {plan.id === 'pro' && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32">
                  <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-sm text-white text-center font-medium">
                    RECOMMENDED
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                  </span>
                  {plan.interval && (
                    <span className="text-sm font-semibold text-gray-500">/{plan.interval}</span>
                  )}
                </p>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-700">
                    <Check className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    {feature}
                  </li>
                ))}
                {plan.limitations?.map((limitation) => (
                  <li key={limitation} className="flex items-center gap-3 text-gray-400">
                    <Check className="h-5 w-5 flex-shrink-0 text-gray-300" />
                    {limitation}
                  </li>
                ))}
              </ul>

              {plan.id === 'pro' ? (
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className={`mt-8 w-full rounded-xl py-3 px-6 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
                    }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Redirecting...
                    </span>
                  ) : (
                    'Upgrade Now'
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="mt-8 w-full rounded-xl bg-gray-100 py-3 px-6 text-center text-sm font-semibold text-gray-600 cursor-not-allowed"
                >
                  Free Plan
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center text-gray-500"
        >
          <p>✨ Upgrade now and unlock all premium features!</p>
          <p className="mt-2">🔒 Secure payment • Cancel anytime • Instant access</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;
