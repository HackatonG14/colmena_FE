import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Input component with various states, styles and validation
 */
const Input = forwardRef(({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  fullWidth = true,
  size = 'md',
  startIcon,
  endIcon,
  className = '',
  autoComplete = 'off',
  ...rest
}, ref) => {
  // Generate a unique ID if not provided
  const inputId = id || `input-${name}-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseInputStyles = `
    block
    border
    rounded-md
    shadow-sm
    bg-white
    transition-colors
    focus:outline-none
    focus:ring-2
    focus:ring-primary-light
    focus:border-transparent
    ${error 
      ? 'border-error text-error focus:ring-error/50' 
      : 'border-gray-300 text-gray-900'
    }
    ${disabled 
      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
      : ''
    }
    ${readOnly 
      ? 'bg-gray-50 cursor-default' 
      : ''
    }
    ${startIcon ? 'pl-10' : ''}
    ${endIcon ? 'pr-10' : ''}
  `;
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };
  
  const width = fullWidth ? 'w-full' : 'w-auto';
  
  return (
    <div className={`${width} ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium mb-1 ${error ? 'text-error' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {startIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error || helperText ? `${inputId}-helper-text` : undefined}
          className={`
            ${baseInputStyles}
            ${sizes[size]}
            ${width}
          `}
          {...rest}
        />
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {endIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p 
          id={`${inputId}-helper-text`} 
          className={`mt-1 text-sm ${error ? 'text-error' : 'text-gray-500'}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text', 'email', 'password', 'number', 'tel', 'url', 
    'search', 'date', 'time', 'datetime-local', 'month', 'week'
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default Input; 