import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component with various styles, hover effects and interactive options
 */
const Card = ({ 
  children, 
  variant = 'default',
  elevation = 'md',
  hover = false,
  interactive = false,
  fullWidth = false,
  className = '',
  onClick,
  ...rest
}) => {
  const baseStyles = `
    rounded-lg
    overflow-hidden
    transition-all
    duration-200
  `;
  
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-transparent border border-gray-200',
    filled: 'bg-gray-100 border-none',
    primary: 'bg-primary-light/10 border border-primary-light/20',
    secondary: 'bg-secondary-light/10 border border-secondary-light/20',
  };
  
  const elevationStyles = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  const hoverStyles = hover ? `
    hover:shadow-lg
    hover:translate-y-[-2px]
  ` : '';
  
  const interactiveStyles = interactive ? `
    cursor-pointer
    hover:shadow-lg
    hover:translate-y-[-2px]
    focus:outline-none
    focus:ring-2
    focus:ring-primary
    focus:ring-offset-2
  ` : '';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <div 
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${elevationStyles[elevation]}
        ${hoverStyles}
        ${interactiveStyles}
        ${widthStyles}
        ${className}
      `}
      onClick={interactive ? onClick : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(e);
        }
      } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '', ...props }) => (
  <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.Body = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'primary', 'secondary']),
  elevation: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  hover: PropTypes.bool,
  interactive: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Card.Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card; 