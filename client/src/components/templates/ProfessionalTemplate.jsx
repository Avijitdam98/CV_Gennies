import React from 'react';

const ProfessionalTemplate = ({ data, formatDate }) => {
  return (
    <div className="bg-white p-8 shadow-lg max-w-[800px] mx-auto">
      {/* Header with colored background */}
      <div className="bg-blue-900 text-white p-8 -mx-8 -mt-8 mb-8">
        <h1 className="text-4xl font-bold">{data.personalInfo?.fullName}</h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {data.personalInfo?.email && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo?.address && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {data.personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo?.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <div className="text-blue-800 font-medium">{exp.company}</div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.institution}</h3>
                    <div className="text-blue-800">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.grade && (
                  <div className="mt-1 text-gray-600">Grade: {edu.grade}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {data.skills.map((skill, index) => (
              <div
                key={`skill-${skill.id || index}`}
                className="relative"
              >
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                  <span className="text-blue-800 text-sm">{skill.level}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-blue-900 rounded"
                    style={{
                      width: `${
                        skill.level === 'Beginner'
                          ? '33%'
                          : skill.level === 'Intermediate'
                          ? '66%'
                          : '100%'
                      }`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-4">
            Notable Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
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
                      <div
                        key={`${project.id}-${tech}-${index}`}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                      >
                        {tech}
                      </div>
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

export default ProfessionalTemplate;
