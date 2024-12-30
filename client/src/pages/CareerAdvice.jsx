import React from 'react';
import { motion } from 'framer-motion';

const CareerAdvice = () => {
  const articles = [
    {
      category: 'Resume Writing',
      title: 'How to Write a Resume That Gets You Hired',
      description: 'Learn the key elements of a successful resume and how to make yours stand out from the competition.',
      readTime: '5 min read',
      image: '📝'
    },
    {
      category: 'Interview Tips',
      title: 'Top 10 Interview Questions and How to Answer Them',
      description: 'Prepare for your next interview with our comprehensive guide to common interview questions.',
      readTime: '8 min read',
      image: '💼'
    },
    {
      category: 'Career Development',
      title: 'Planning Your Career Path: A Step-by-Step Guide',
      description: 'Discover how to set career goals and create an actionable plan to achieve them.',
      readTime: '6 min read',
      image: '🎯'
    },
    {
      category: 'Job Search',
      title: 'Effective Job Search Strategies in 2024',
      description: 'Master modern job search techniques and find your dream job faster.',
      readTime: '7 min read',
      image: '🔍'
    },
    {
      category: 'Professional Growth',
      title: 'Building Your Personal Brand',
      description: 'Learn how to create and maintain a strong professional presence online and offline.',
      readTime: '4 min read',
      image: '⭐'
    },
    {
      category: 'Workplace Success',
      title: 'Mastering Workplace Communication',
      description: 'Improve your communication skills to advance your career and build better relationships.',
      readTime: '6 min read',
      image: '🗣️'
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Career Advice & Resources
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Expert guidance to help you succeed in your career journey
          </p>
        </div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8 text-white">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
              Featured
            </span>
            <h3 className="text-2xl font-bold mb-4">
              2024 Career Trends: What You Need to Know
            </h3>
            <p className="mb-6 text-white/80">
              Stay ahead of the curve with our comprehensive analysis of emerging career trends,
              in-demand skills, and industry insights for the year ahead.
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors duration-300">
              Read More
            </button>
          </div>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-blue-600">
                    {article.category}
                  </span>
                  <span className="text-3xl">{article.image}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gray-50 rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Get Career Tips in Your Inbox</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for weekly career advice and job search tips
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerAdvice;
