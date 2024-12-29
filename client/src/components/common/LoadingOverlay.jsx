import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ isLoading, children }) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-[var(--z-loading)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
