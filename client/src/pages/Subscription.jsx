import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const RAZORPAY_PAYMENT_LINK = 'https://rzp.io/rzp/KyTwxBLi';

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      features: [
        'Access to basic templates',
        'Create up to 3 resumes',
        'Download as PDF',
        'Basic customization options',
      ],
      buttonText: 'Current Plan',
      disabled: true,
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: 320,
      features: [
        'Access to all premium templates',
        'Unlimited resumes',
        'Priority support',
        'Advanced customization options',
        'Shareable resume links',
        'Remove watermark',
        'Multiple export formats',
      ],
      buttonText: 'Upgrade Now',
      disabled: false,
    },
  ];

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await axios.get('/api/payments/subscription-status', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSubscriptionStatus(response.data.subscription);
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      }
    };

    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  const handlePayment = async (planId) => {
    if (planId === 'pro') {
      window.location.href = RAZORPAY_PAYMENT_LINK;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Select the perfect plan for your resume building needs
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-lg divide-y divide-gray-200 ${
              plan.id === 'pro' ? 'border-2 border-primary-500' : ''
            }`}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {plan.name}
                {plan.id === 'pro' && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    Recommended
                  </span>
                )}
              </h3>
              <p className="mt-4 text-gray-500">
                {plan.price === 0 ? (
                  'Free'
                ) : (
                  <span>
                    ₹{plan.price}
                    <span className="text-base font-medium">/month</span>
                  </span>
                )}
              </p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-green-500"
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
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.id === 'pro' ? (
                <a
                  href={RAZORPAY_PAYMENT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 w-full py-3 px-4 rounded-md shadow bg-primary-600 hover:bg-primary-700 text-white text-center font-medium inline-block transition-colors duration-200`}
                >
                  {plan.buttonText}
                </a>
              ) : (
                <button
                  disabled={true}
                  className="mt-8 w-full py-3 px-4 rounded-md shadow bg-gray-300 cursor-not-allowed text-white text-center font-medium"
                >
                  {plan.buttonText}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {subscriptionStatus && (
        <div className="mt-8 bg-blue-50 p-4 rounded-md">
          <h4 className="text-lg font-medium text-blue-800">
            Current Subscription Status
          </h4>
          <p className="mt-2 text-blue-700">
            Plan: {subscriptionStatus.type.charAt(0).toUpperCase() + subscriptionStatus.type.slice(1)}
            {subscriptionStatus.validUntil && (
              <span className="ml-2">
                (Valid until:{' '}
                {new Date(subscriptionStatus.validUntil).toLocaleDateString()})
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Subscription;
