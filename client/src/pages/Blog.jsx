import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  const blogPosts = [
    {
      title: '10 Tips for Writing a Perfect Resume',
      excerpt: 'Learn how to create a resume that stands out and gets you noticed by recruiters.',
      author: 'Sarah Johnson',
      date: 'Dec 25, 2023',
      category: 'Resume Tips'
    },
    {
      title: 'The Future of AI in Resume Writing',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way we create resumes.',
      author: 'Mike Chen',
      date: 'Dec 20, 2023',
      category: 'Technology'
    },
    {
      title: 'Common Resume Mistakes to Avoid',
      excerpt: "Don't let these common mistakes hold you back from landing your dream job.",
      author: 'Emily Brown',
      date: 'Dec 15, 2023',
      category: 'Career Advice'
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Latest from Our Blog
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Expert tips and insights for your career success
          </p>
        </div>

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <span className="text-gray-700">{post.author}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
