import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

/**
 * ProtectRoute is a security component that prevents unauthorized access to protected routes
 * It redirects unauthenticated users to the login page with a message and preserves the intended destination
 */
const ProtectRoute = () => {
  const { userInfo } = useSelector(state => state.auth);
  const location = useLocation();

  // If user is authenticated, allow access to child routes
  if (userInfo) {
    return <Outlet />;
  } 
  
  // If not authenticated, redirect to login and show message
  // Save the current location to redirect back after login
  toast.error('Inicia sesión para acceder a esta sección');
  return (
    <Navigate 
      to='/login' 
      state={{ from: location.pathname }} 
      replace={true} 
    />
  );
};

export default ProtectRoute; 