import React from 'react';
import { motion } from 'framer-motion';

const Tips = () => {
  const categories = [
    {
      title: 'Resume Writing',
      tips: [
        {
          title: 'Use Action Words',
          description: 'Start bullet points with strong action verbs like "achieved," "implemented," "developed."',
          example: 'Example: "Implemented new sales strategy resulting in 30% revenue growth"'
        },
        {
          title: 'Quantify Achievements',
          description: 'Include numbers and percentages to demonstrate your impact.',
          example: 'Example: "Managed a team of 15 employees" or "Increased sales by 25%"'
        },
        {
          title: 'Tailor Your Resume',
          description: 'Customize your resume for each job application using relevant keywords.',
          example: 'Example: Match skills and experiences to the job description'
        }
      ]
    },
    {
      title: 'Formatting Tips',
      tips: [
        {
          title: 'Keep it Concise',
          description: 'Limit your resume to 1-2 pages, focusing on relevant information.',
          example: 'Example: Remove outdated experiences and irrelevant details'
        },
        {
          title: 'Use Consistent Formatting',
          description: 'Maintain consistent fonts, spacing, and bullet points throughout.',
          example: 'Example: Use the same font size for all section headers'
        },
        {
          title: 'Make it Scannable',
          description: 'Use clear sections and white space to improve readability.',
          example: 'Example: Use bold headers and bullet points for easy scanning'
        }
      ]
    },
    {
      title: 'Content Organization',
      tips: [
        {
          title: 'Prioritize Information',
          description: 'Put your most relevant and recent experiences first.',
          example: 'Example: List your current job before older positions'
        },
        {
          title: 'Include Keywords',
          description: 'Incorporate industry-specific terms and skills from the job posting.',
          example: 'Example: Include technical skills and certifications relevant to the role'
        },
        {
          title: 'Focus on Results',
          description: 'Emphasize outcomes and achievements rather than just duties.',
          example: 'Example: "Reduced costs by 20%" instead of "Responsible for cost reduction"'
        }
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Resume Writing Tips
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Expert advice to help you create a standout resume
          </p>
        </div>

        {/* Quick Tips Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-12"
        >
          <h3 className="text-xl font-bold mb-4">Quick Tips</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="flex items-center">
              <span className="text-2xl mr-2">✨</span>
              Keep it concise and relevant
            </li>
            <li className="flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Use data to showcase impact
            </li>
            <li className="flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Tailor for each application
            </li>
          </ul>
        </motion.div>

        {/* Detailed Tips */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6">{category.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.tips.map((tip, tipIndex) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (categoryIndex * 0.1) + (tipIndex * 0.1) }}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h4 className="text-lg font-semibold mb-3 text-blue-600">
                      {tip.title}
                    </h4>
                    <p className="text-gray-600 mb-4">{tip.description}</p>
                    <p className="text-sm text-gray-500 italic">{tip.example}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Pro Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gray-50 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Pro Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-3 text-blue-600">
                ATS Optimization
              </h4>
              <p className="text-gray-600">
                Ensure your resume is ATS-friendly by using standard section headers
                and incorporating relevant keywords from the job description.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-3 text-blue-600">
                Professional Summary
              </h4>
              <p className="text-gray-600">
                Start with a compelling professional summary that highlights your
                key achievements and career objectives in 2-3 sentences.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tips;
