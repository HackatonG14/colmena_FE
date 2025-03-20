import React from 'react';
import PropTypes from 'prop-types';
import { Toaster as HotToaster, toast as hotToast } from 'react-hot-toast';

/**
 * Toast component for displaying ephemeral notifications
 */

// Custom Toast component to display inside react-hot-toast
export const Toast = ({ 
  message, 
  type = 'default', 
  icon,
  action
}) => {
  const baseStyles = `
    px-4 py-3
    rounded-lg shadow-md
    flex items-center
    min-w-[200px] max-w-md
    border-l-4
  `;
  
  const typeStyles = {
    default: {
      bg: 'bg-white',
      border: 'border-gray-300',
      text: 'text-gray-800',
      icon: null
    },
    success: {
      bg: 'bg-white',
      border: 'border-success',
      text: 'text-success-dark',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    error: {
      bg: 'bg-white',
      border: 'border-error',
      text: 'text-error-dark',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-error" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    },
    info: {
      bg: 'bg-white',
      border: 'border-info',
      text: 'text-info-dark',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-info" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    },
    warning: {
      bg: 'bg-white',
      border: 'border-warning',
      text: 'text-warning-dark',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    }
  };
  
  const selectedType = typeStyles[type];
  const displayIcon = icon || selectedType.icon;
  
  return (
    <div 
      className={`
        ${baseStyles}
        ${selectedType.bg}
        ${selectedType.border}
      `}
      role="alert"
    >
      {displayIcon && (
        <div className="flex-shrink-0 mr-3">
          {displayIcon}
        </div>
      )}
      <div className={`flex-1 mr-2 ${selectedType.text}`}>
        {message}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'error', 'info', 'warning']),
  icon: PropTypes.node,
  action: PropTypes.node
};

// Toast container (use this once in your app)
export const Toaster = () => (
  <HotToaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0
      }
    }}
  />
);

// Toast functions
export const toast = {
  default: (message, options = {}) => 
    hotToast.custom(<Toast message={message} type="default" {...options} />),
  
  success: (message, options = {}) => 
    hotToast.custom(<Toast message={message} type="success" {...options} />),
  
  error: (message, options = {}) => 
    hotToast.custom(<Toast message={message} type="error" {...options} />),
  
  info: (message, options = {}) => 
    hotToast.custom(<Toast message={message} type="info" {...options} />),
  
  warning: (message, options = {}) => 
    hotToast.custom(<Toast message={message} type="warning" {...options} />),
  
  promise: (promise, messages, options = {}) =>
    hotToast.promise(
      promise,
      {
        loading: <Toast message={messages.loading || 'Loading...'} type="info" {...options} />,
        success: (data) => <Toast message={typeof messages.success === 'function' ? messages.success(data) : messages.success} type="success" {...options} />,
        error: (err) => <Toast message={typeof messages.error === 'function' ? messages.error(err) : messages.error} type="error" {...options} />
      }
    )
};

export default toast; 