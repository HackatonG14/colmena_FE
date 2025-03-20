export const theme = {
  colors: {
    primary: {
      main: '#FFB800', 
      light: '#FFC633',
      dark: '#E5A500',
      contrast: '#FFFFFF'
    },
    secondary: {
      main: '#2C3E50',
      light: '#34495E',
      dark: '#1A252F',
      contrast: '#FFFFFF'
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
      dark: '#2C3E50',
      light: '#F3F4F6'
    },
    text: {
      primary: '#2C3E50',
      secondary: '#6C757D',
      light: '#FFFFFF',
      disabled: '#9CA3AF'
    },
    error: '#DC3545',
    success: '#28A745',
    warning: '#FFC107',
    info: '#17A2B8',
  },
  typography: {
    fontFamily: {
      primary: '"Inter", sans-serif',
      secondary: '"Poppins", sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    default: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  // Accessibility
  focusRing: {
    width: '3px',
    color: 'rgba(255, 184, 0, 0.6)', // Amber color with opacity
    offset: '2px'
  },
  // Component sizes
  components: {
    button: {
      minWidth: '120px',
      height: {
        sm: '32px',
        md: '40px',
        lg: '48px'
      }
    },
    input: {
      height: {
        sm: '32px',
        md: '40px',
        lg: '48px'
      }
    },
    card: {
      width: {
        sm: '300px',
        md: '350px',
        lg: '400px'
      }
    },
    container: {
      maxWidth: '1280px',
      padding: '0 1rem'
    }
  }
};