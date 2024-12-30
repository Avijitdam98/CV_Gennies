import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    question: "What is CV Gennies?",
    answer: "CV Gennies is a professional resume builder that helps you create stunning, ATS-friendly resumes in minutes. Our platform offers multiple templates and customization options to make your resume stand out."
  },
  {
    question: "Is CV Gennies free to use?",
    answer: "Yes, CV Gennies offers a free tier that includes basic templates and features. We also offer premium plans with advanced features, more templates, and unlimited resume creation."
  },
  {
    question: "Can I download my resume as a PDF?",
    answer: "Yes, you can download your resume in PDF format, which is the most widely accepted format by employers and maintains consistent formatting across different devices."
  },
  {
    question: "Are the resumes ATS-friendly?",
    answer: "Yes, all our resume templates are designed to be ATS (Applicant Tracking System) friendly, ensuring your resume gets past automated screening systems and reaches human recruiters."
  },
  {
    question: "Can I create multiple resumes?",
    answer: "Yes, you can create and save multiple versions of your resume, allowing you to tailor each one for different job applications or industries."
  },
  {
    question: "How do I customize my resume template?",
    answer: "Our intuitive editor allows you to customize every aspect of your resume, including fonts, colors, sections, and layout. Simply click on any element to edit it."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about CV Gennies
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              className="mb-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
              sx={{
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '0 0 16px 0',
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-blue-600" />}
                className="px-6 py-4"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
              </AccordionSummary>
              <AccordionDetails className="px-6 pb-6">
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
