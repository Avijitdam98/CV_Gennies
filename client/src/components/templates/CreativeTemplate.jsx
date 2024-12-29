import React from 'react';

const CreativeTemplate = ({ data, formatDate }) => {
  return (
    <div className="bg-white p-8 shadow-lg max-w-[800px] mx-auto">
      {/* Header with creative design */}
      <div className="relative mb-12 pb-8">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full opacity-10"></div>
        <div className="absolute top-4 left-4 w-32 h-32 bg-pink-500 rounded-full opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {data.personalInfo?.fullName}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600 mt-4">
            {data.personalInfo?.email && (
              <a href={`mailto:${data.personalInfo.email}`} className="hover:text-purple-600 transition-colors">
                {data.personalInfo.email}
              </a>
            )}
            {data.personalInfo?.phone && (
              <span className="hover:text-purple-600 transition-colors">
                {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo?.address && (
              <span className="hover:text-purple-600 transition-colors">
                {data.personalInfo.address}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Summary with creative border */}
      {data.personalInfo?.summary && (
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
          <p className="text-gray-700 leading-relaxed pl-4">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="group relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-gradient-to-b group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300"></div>
                <div className="pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {exp.position}
                      </h3>
                      <div className="text-gray-600">{exp.company}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills with creative display */}
      {data.skills?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className="group relative px-4 py-2 bg-gray-50 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              >
                <span className="text-gray-700 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                {skill.level && (
                  <span className="ml-2 text-xs text-gray-500 group-hover:text-white/80 transition-colors">
                    {skill.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="group relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-gradient-to-b group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300"></div>
                <div className="pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {edu.institution}
                      </h3>
                      <div className="text-gray-600">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                  {edu.grade && (
                    <div className="mt-1 text-gray-600">Grade: {edu.grade}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className="group p-4 rounded-lg bg-gray-50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-pink-600 transition-colors"
                    >
                      View →
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="mt-2 text-gray-600">{project.description}</p>
                )}
                {project.technologies?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-white text-gray-600 border border-gray-200"
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

export default CreativeTemplate;
