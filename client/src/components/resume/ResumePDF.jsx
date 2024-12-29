import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts for better typography
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#374151',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    borderBottom: '2 solid #E5E7EB',
    paddingBottom: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    color: '#4B5563',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 12,
    borderBottom: '1 solid #E5E7EB',
    paddingBottom: 8,
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 12,
    position: 'relative',
  },
  bullet: {
    position: 'absolute',
    left: 0,
    top: 6,
    width: 4,
    height: 4,
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    padding: '4 8',
    fontSize: 11,
    color: '#2563EB',
  },
  languageItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    padding: '6 12',
    marginRight: 8,
    marginBottom: 8,
  },
  languageName: {
    color: '#2563EB',
    fontWeight: 600,
  },
  languageLevel: {
    color: '#4B5563',
    fontSize: 10,
  },
  projectTech: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  techItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    padding: '2 6',
    fontSize: 9,
    color: '#4B5563',
  },
  link: {
    color: '#2563EB',
    textDecoration: 'underline',
  },
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header / Personal Info */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {data.personalInfo?.fullName || 'Your Name'}
        </Text>
        <View style={styles.contactInfo}>
          {data.personalInfo?.email && (
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          )}
          {data.personalInfo?.phone && (
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          )}
          {data.personalInfo?.address && (
            <Text style={styles.contactItem}>{data.personalInfo.address}</Text>
          )}
          {data.personalInfo?.linkedin && (
            <Text style={[styles.contactItem, styles.link]}>{data.personalInfo.linkedin}</Text>
          )}
        </View>
        {data.personalInfo?.summary && (
          <Text style={styles.description}>{data.personalInfo.summary}</Text>
        )}
      </View>

      {/* Skills Section */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                {skill.name} • {skill.proficiency}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Experience Section */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.bullet} />
              <Text style={styles.itemTitle}>{exp.position}</Text>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              <Text style={styles.dateRange}>
                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
              </Text>
              {exp.description && (
                <Text style={styles.description}>{exp.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education Section */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.bullet} />
              <Text style={styles.itemTitle}>{edu.institution}</Text>
              <Text style={styles.itemSubtitle}>
                {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
              </Text>
              <Text style={styles.dateRange}>
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
              </Text>
              {edu.description && (
                <Text style={styles.description}>{edu.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Projects Section */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((project, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.bullet} />
              <Text style={styles.itemTitle}>{project.title}</Text>
              {project.description && (
                <Text style={styles.description}>{project.description}</Text>
              )}
              {project.technologies && (
                <View style={styles.projectTech}>
                  {(Array.isArray(project.technologies) 
                    ? project.technologies 
                    : project.technologies.split(',')
                  ).map((tech, i) => (
                    <Text key={i} style={styles.techItem}>
                      {typeof tech === 'string' ? tech.trim() : tech}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Certifications Section */}
      {data.certifications?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {data.certifications.map((cert, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.bullet} />
              <Text style={styles.itemTitle}>{cert.name}</Text>
              <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
              <Text style={styles.dateRange}>
                {formatDate(cert.issueDate)}
                {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Languages Section */}
      {data.languages?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.skillsContainer}>
            {data.languages.map((lang, index) => (
              <View key={index} style={styles.languageItem}>
                <Text style={styles.languageName}>{lang.name}</Text>
                <Text style={styles.languageLevel}> • {lang.proficiency}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Awards Section */}
      {data.awards?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Awards & Achievements</Text>
          {data.awards.map((award, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.bullet} />
              <Text style={styles.itemTitle}>{award.title}</Text>
              <Text style={styles.itemSubtitle}>{award.issuer}</Text>
              <Text style={styles.dateRange}>{formatDate(award.date)}</Text>
              {award.description && (
                <Text style={styles.description}>{award.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;
