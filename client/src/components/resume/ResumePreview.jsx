import React, { forwardRef } from 'react';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ResumePreview = forwardRef(({ data, selectedTemplate = 'modern' }, ref) => {
  const getTemplate = () => {
    switch (selectedTemplate.toLowerCase()) {
      case 'modern':
        return <ModernTemplate data={data} formatDate={formatDate} />;
      case 'minimal':
        return <MinimalTemplate data={data} formatDate={formatDate} />;
      case 'professional':
        return <ProfessionalTemplate data={data} formatDate={formatDate} />;
      case 'creative':
        return <CreativeTemplate data={data} formatDate={formatDate} />;
      case 'executive':
        return <ExecutiveTemplate data={data} formatDate={formatDate} />;
      default:
        return <ModernTemplate data={data} formatDate={formatDate} />;
    }
  };

  return (
    <div 
      ref={ref}
      className="resume-preview bg-white shadow-lg rounded-lg overflow-hidden"
      style={{ 
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '0',
        boxSizing: 'border-box',
        backgroundColor: 'white'
      }}
    >
      {getTemplate()}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
