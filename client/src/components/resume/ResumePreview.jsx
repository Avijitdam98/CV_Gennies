import React, { forwardRef } from 'react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ResumePreview = forwardRef(({ data }, ref) => {
  return (
    <div 
      ref={ref}
      className="resume-preview bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      {/* Personal Info Section */}
      <div className="border-b-2 border-primary-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="text-gray-600 flex flex-wrap gap-4 items-center text-sm">
          {data.personalInfo?.email && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo?.address && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {data.personalInfo.address}
            </div>
          )}
          {data.personalInfo?.linkedin && (
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          )}
          {data.personalInfo?.website && (
            <a
              href={data.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Portfolio
            </a>
          )}
        </div>
        {data.personalInfo?.summary && (
          <p className="mt-4 text-gray-600 leading-relaxed">{data.personalInfo.summary}</p>
        )}
      </div>

      {/* Experience Section */}
      {data.experience?.length > 0 && (
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-500 before:rounded-full">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <div className="text-gray-700">{exp.company}</div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.location && (
                  <div className="text-gray-600 mb-2">{exp.location}</div>
                )}
                {exp.description && (
                  <p className="text-gray-600 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {data.education?.length > 0 && (
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-500 before:rounded-full">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                  <div className="text-gray-500 text-sm">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                <div className="text-gray-700 mb-1">
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </div>
                {edu.grade && (
                  <div className="text-gray-600">Grade: {edu.grade}</div>
                )}
                {edu.description && (
                  <p className="text-gray-600 mt-2 whitespace-pre-line">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {data.skills?.length > 0 && (
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                  {skill.name}
                </span>
                <span className="ml-2 text-xs text-gray-500">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {data.projects?.length > 0 && (
        <div className="py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-500 before:rounded-full">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      View Project →
                    </a>
                  )}
                </div>
                <div className="text-gray-600 whitespace-pre-line">{project.description}</div>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(','))
                      .map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {typeof tech === 'string' ? tech.trim() : tech}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {data.certifications?.length > 0 && (
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
          <div className="space-y-6">
            {data.certifications.map((cert, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-500 before:rounded-full">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    <div className="text-gray-700">{cert.issuer}</div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {formatDate(cert.issueDate)}
                    {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                  </div>
                </div>
                {cert.credentialId && (
                  <div className="text-gray-600 text-sm">
                    Credential ID: {cert.credentialId}
                  </div>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center mt-1"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {data.languages?.length > 0 && (
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex items-center bg-primary-50 px-4 py-2 rounded-lg">
                <span className="font-medium text-primary-700">{lang.name}</span>
                <span className="ml-2 text-sm text-primary-600">• {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards Section */}
      {data.awards?.length > 0 && (
        <div className="py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Awards & Achievements</h2>
          <div className="space-y-6">
            {data.awards.map((award, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-500 before:rounded-full">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{award.title}</h3>
                    <div className="text-gray-700">{award.issuer}</div>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {formatDate(award.date)}
                  </div>
                </div>
                {award.description && (
                  <p className="text-gray-600 mt-1">{award.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
