import React from 'react';

const ExecutiveTemplate = ({ data, formatDate }) => {
  return (
    <div className="bg-white p-8 shadow-lg max-w-[800px] mx-auto">
      {/* Header */}
      <div className="border-b-4 border-gray-900 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wider mb-4">
          {data.personalInfo?.fullName}
        </h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            {data.personalInfo?.email && (
              <div className="flex items-center text-gray-700">
                <span className="font-semibold mr-2">Email:</span>
                <a href={`mailto:${data.personalInfo.email}`} className="hover:text-gray-900">
                  {data.personalInfo.email}
                </a>
              </div>
            )}
            {data.personalInfo?.phone && (
              <div className="flex items-center text-gray-700">
                <span className="font-semibold mr-2">Phone:</span>
                {data.personalInfo.phone}
              </div>
            )}
          </div>
          <div className="space-y-2">
            {data.personalInfo?.address && (
              <div className="flex items-center text-gray-700">
                <span className="font-semibold mr-2">Location:</span>
                {data.personalInfo.address}
              </div>
            )}
            {data.personalInfo?.linkedin && (
              <div className="flex items-center text-gray-700">
                <span className="font-semibold mr-2">LinkedIn:</span>
                <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                  Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      {data.personalInfo?.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-4">
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Professional Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-gray-200 pl-4 hover:border-gray-900 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <div className="text-lg text-gray-700">{exp.company}</div>
                  </div>
                  <div className="text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-gray-200 pl-4 hover:border-gray-900 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{edu.institution}</h3>
                    <div className="text-lg text-gray-700">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </div>
                  </div>
                  <div className="text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.grade && (
                  <div className="mt-1 text-gray-600">
                    Grade: {edu.grade}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Competencies */}
      {data.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-4">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{skill.name}</span>
                <span className="text-gray-600 text-sm uppercase tracking-wider">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Projects */}
      {data.projects?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-4">
            Key Projects & Achievements
          </h2>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id} className="border-l-4 border-gray-200 pl-4 hover:border-gray-900 transition-colors">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      View Project
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="mt-2 text-gray-700">{project.description}</p>
                )}
                {project.technologies?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveTemplate;
