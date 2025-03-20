import React from 'react';
import PropTypes from 'prop-types';
import { theme } from '../../utils/theme';

/**
 * Button component that supports various variants, sizes, and states
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  onClick,
  ariaLabel,
  ...rest
}) => {
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-colors duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
  `;
  
  // Size styles
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  // Variant styles
  const variantStyles = {
    primary: `
      bg-primary text-white
      hover:bg-primary-dark
      focus-visible:ring-primary-light
    `,
    secondary: `
      bg-secondary text-white
      hover:bg-secondary-dark
      focus-visible:ring-secondary-light
    `,
    outline: `
      bg-transparent
      border border-primary text-primary
      hover:bg-primary hover:text-white
      focus-visible:ring-primary-light
    `,
    outlineSecondary: `
      bg-transparent
      border border-secondary text-secondary
      hover:bg-secondary hover:text-white
      focus-visible:ring-secondary-light
    `,
    text: `
      bg-transparent text-primary
      hover:bg-primary-light/10
      focus-visible:ring-primary-light
    `,
    textSecondary: `
      bg-transparent text-secondary
      hover:bg-secondary-light/10
      focus-visible:ring-secondary-light
    `,
    error: `
      bg-error text-white
      hover:bg-error/90
      focus-visible:ring-error/50
    `,
    success: `
      bg-success text-white
      hover:bg-success/90
      focus-visible:ring-success/50
    `,
  };

  // Spinner for loading state
  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      onClick={!disabled && !loading ? onClick : undefined}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <LoadingSpinner />}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'outlineSecondary', 'text', 'textSecondary', 'error', 'success']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};

export default Button; 