import React from 'react';

const MinimalTemplate = ({ data, formatDate }) => {
  return (
    <div className="bg-white p-8 shadow-lg max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-900 uppercase tracking-wider">
          {data.personalInfo?.fullName}
        </h1>
        <div className="text-gray-600 mt-2 space-x-4 text-sm">
          {data.personalInfo?.email && <span key="email">{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span key="phone">• {data.personalInfo.phone}</span>}
          {data.personalInfo?.address && <span key="address">• {data.personalInfo.address}</span>}
        </div>
        {data.personalInfo?.summary && (
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            {data.personalInfo.summary}
          </p>
        )}
      </div>

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider text-gray-900 mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[1fr,2fr] gap-4">
                <div className="text-gray-600 text-sm">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <div className="text-gray-700">{exp.company}</div>
                  {exp.description && (
                    <p className="mt-2 text-gray-600 text-sm whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider text-gray-900 mb-4">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[1fr,2fr] gap-4">
                <div className="text-gray-600 text-sm">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                  <div className="text-gray-700">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  {edu.grade && (
                    <div className="text-gray-600 text-sm mt-1">
                      Grade: {edu.grade}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider text-gray-900 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={`skill-${skill.id || index}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div>
          <h2 className="text-lg font-light uppercase tracking-wider text-gray-900 mb-4">
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 text-sm"
                    >
                      View Project →
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="mt-2 text-gray-600 text-sm">
                    {project.description}
                  </p>
                )}
                {project.technologies?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={`${project.id}-${tech}-${index}`}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs"
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

export default MinimalTemplate;
