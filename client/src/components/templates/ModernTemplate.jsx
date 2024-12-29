import React from 'react';

const ModernTemplate = ({ data }) => {
  return (
    <div className="bg-white p-8 shadow-lg max-w-[800px] mx-auto">
      {/* Header */}
      <div className="border-l-4 border-primary-500 pl-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo?.fullName}</h1>
        <div className="text-gray-600 mt-2 space-y-1">
          {data.personalInfo?.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo?.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo?.address && <p>{data.personalInfo.address}</p>}
        </div>
        {data.personalInfo?.summary && (
          <p className="mt-4 text-gray-700">{data.personalInfo.summary}</p>
        )}
      </div>

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative pl-4 border-l border-gray-200">
                <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[6.5px] top-2"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <div className="text-gray-700">{exp.company}</div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative pl-4 border-l border-gray-200">
                <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[6.5px] top-2"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.institution}</h3>
                    <div className="text-gray-700">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.grade && (
                  <div className="text-gray-600 mt-1">Grade: {edu.grade}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-primary-500 rounded-full"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.id} className="relative pl-4 border-l border-gray-200">
                <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[6.5px] top-2"></div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm"
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
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-sm rounded"
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

export default ModernTemplate;
