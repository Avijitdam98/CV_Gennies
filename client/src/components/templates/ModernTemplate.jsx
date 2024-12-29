import React from 'react';

const ModernTemplate = ({ data, formatDate }) => {
  return (
    <div className="p-8 font-sans">
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="mt-2 text-gray-600 flex flex-wrap gap-4">
          {data.personalInfo?.email && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo?.phone && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo?.address && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {data.personalInfo.address}
            </span>
          )}
        </div>
        {data.personalInfo?.summary && (
          <p className="mt-4 text-gray-700">{data.personalInfo.summary}</p>
        )}
      </div>

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <div className="text-gray-700">{exp.company}</div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 text-gray-600 text-sm whitespace-pre-line">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                    <div className="text-gray-700">{edu.degree}</div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.description && (
                  <p className="mt-2 text-gray-600 text-sm whitespace-pre-line">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                <p className="mt-2 text-gray-600 text-sm whitespace-pre-line">
                  {project.description}
                </p>
                {project.technologies && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(',')).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tech.trim()}
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

export default ModernTemplate;
