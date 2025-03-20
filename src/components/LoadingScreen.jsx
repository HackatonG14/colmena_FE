import React from 'react';

/**
 * LoadingScreen component that displays a spinner while content is loading
 * Uses accessible attributes to announce loading state to screen readers
 */
const LoadingScreen = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[300px] p-8"
      role="alert"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <p className="text-gray-600 font-medium">Cargando...</p>
    </div>
  );
};

export default LoadingScreen; 