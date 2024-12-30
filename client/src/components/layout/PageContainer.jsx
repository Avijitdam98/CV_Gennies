import React from 'react';

const PageContainer = ({ children }) => {
  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-6 py-6">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
