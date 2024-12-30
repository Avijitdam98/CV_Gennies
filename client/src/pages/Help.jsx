import React from 'react';
import { motion } from 'framer-motion';

const Help = () => {
  const faqs = [
    {
      question: 'How do I create a resume?',
      answer: 'Click on "Create Resume" button, choose a template, and follow our step-by-step guide to fill in your information. Our AI-powered system will help you create a professional resume in minutes.'
    },
    {
      question: 'Can I edit my resume after creating it?',
      answer: 'Yes! You can edit your resume at any time. Simply go to "My Resumes" section and click on the resume you want to edit.'
    },
    {
      question: 'What formats can I download my resume in?',
      answer: 'You can download your resume in PDF and Word formats. Premium users have access to additional export options.'
    },
    {
      question: 'Is my information secure?',
      answer: 'Yes, we take data security seriously. All your information is encrypted and stored securely. We never share your personal information with third parties.'
    },
    {
      question: 'How do I share my resume?',
      answer: 'You can share your resume by generating a unique link in the "My Resumes" section. You control who can view your resume and for how long.'
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Help Center
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Find answers to common questions about using CV Gennies
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-8 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Still need help?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to assist you
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Help;
