import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';

const Preview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const sampleData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 890',
      address: 'New York, NY',
      title: 'Senior Software Engineer',
      summary: 'Experienced software engineer with a passion for building scalable applications and leading development teams.'
    },
    education: [
      {
        school: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2015',
        endDate: '2019',
        description: 'Major in Software Engineering, Minor in Mathematics'
      }
    ],
    experience: [
      {
        company: 'Tech Solutions Inc.',
        position: 'Senior Software Engineer',
        startDate: '2019',
        endDate: 'Present',
        description: 'Lead developer for enterprise applications, managing a team of 5 engineers.'
      },
      {
        company: 'Digital Innovations Co.',
        position: 'Software Developer',
        startDate: '2017',
        endDate: '2019',
        description: 'Developed and maintained multiple web applications using React and Node.js.'
      }
    ],
    skills: [
      'JavaScript',
      'React',
      'Node.js',
      'Python',
      'SQL',
      'AWS',
      'Docker',
      'Git'
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Built a scalable e-commerce platform serving 100k+ users',
        link: 'https://example.com/project'
      }
    ],
    languages: [
      {
        language: 'English',
        proficiency: 'Native'
      },
      {
        language: 'Spanish',
        proficiency: 'Intermediate'
      }
    ]
  };

  const formatDate = (date) => {
    if (!date) return '';
    if (date.toLowerCase() === 'present') return 'Present';
    try {
      const options = { year: 'numeric', month: 'short' };
      return new Date(date).toLocaleDateString('en-US', options);
    } catch (error) {
      return date;
    }
  };

  const getTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={sampleData} formatDate={formatDate} />;
      case 'minimal':
        return <MinimalTemplate data={sampleData} formatDate={formatDate} />;
      case 'professional':
        return <ProfessionalTemplate data={sampleData} formatDate={formatDate} />;
      case 'creative':
        return <CreativeTemplate data={sampleData} formatDate={formatDate} />;
      case 'executive':
        return <ExecutiveTemplate data={sampleData} formatDate={formatDate} />;
      default:
        return <ModernTemplate data={sampleData} formatDate={formatDate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {templateId.charAt(0).toUpperCase() + templateId.slice(1)} Template Preview
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/examples')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Back to Templates
            </button>
            <button
              onClick={() => navigate('/resume-builder', { state: { template: templateId } })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Use This Template
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-8">
            {getTemplate()}
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Template Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-2">Professional Layout</h3>
              <p className="text-gray-600">Clean and organized structure that highlights your experience</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-2">ATS-Friendly</h3>
              <p className="text-gray-600">Optimized for Applicant Tracking Systems</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-2">Customizable Sections</h3>
              <p className="text-gray-600">Easily add or remove sections to match your needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
