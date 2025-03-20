import React from 'react';
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

/**
 * Main layout component that wraps the entire application
 * Includes header, footer, and toast notifications
 */
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main 
        id="main-content" 
        className="flex-grow"
        tabIndex="-1"  // Makes it focusable for accessibility
      >
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          // Default styling for toasts
          className: '',
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
          },
          // Success toast
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#28A745',
              secondary: '#fff',
            },
          },
          // Error toast
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#DC3545',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout; 