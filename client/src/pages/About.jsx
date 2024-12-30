import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: 'Former HR executive with 15 years of experience in talent acquisition.'
    },
    {
      name: 'Jane Smith',
      role: 'Head of Design',
      bio: 'Award-winning designer specializing in user experience and interface design.'
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer',
      bio: 'Full-stack developer with expertise in AI and machine learning.'
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600">
            At CV Gennies, we're on a mission to revolutionize the way people create and manage their
            professional profiles. We believe everyone deserves a chance to showcase their best self.
          </p>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
            <div className="text-gray-600">Resumes Created</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Templates</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </motion.section>

        {/* Team Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full"></div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
