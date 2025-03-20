import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaHeart, FaLock, FaExchangeAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

/**
 * Dashboard layout component that provides the structure for user account pages
 * Includes a responsive sidebar for navigation between dashboard sections
 */
const DashboardLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Dashboard navigation items
  const navItems = [
    { 
      path: '/dashboard', 
      label: 'Perfil', 
      icon: <FaUser aria-hidden="true" className="h-5 w-5" />,
      exact: true 
    },
    { 
      path: '/dashboard/my-orders', 
      label: 'Mis Pedidos', 
      icon: <FaShoppingBag aria-hidden="true" className="h-5 w-5" /> 
    },
    { 
      path: '/dashboard/my-wishlist', 
      label: 'Lista de Deseos', 
      icon: <FaHeart aria-hidden="true" className="h-5 w-5" /> 
    },
    { 
      path: '/dashboard/change-password', 
      label: 'Cambiar Contraseña', 
      icon: <FaLock aria-hidden="true" className="h-5 w-5" /> 
    },
    { 
      path: '/card', 
      label: 'Intercambios', 
      icon: <FaExchangeAlt aria-hidden="true" className="h-5 w-5" /> 
    }
  ];
  
  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Check if a nav item is active
  const isActive = (path) => {
    if (path === '/dashboard' && pathname === '/dashboard') {
      return true;
    }
    return pathname.includes(path) && path !== '/dashboard';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? (
            <>
              <FaTimes className="h-6 w-6" />
              <span className="ml-2">Cerrar menú</span>
            </>
          ) : (
            <>
              <FaBars className="h-6 w-6" />
              <span className="ml-2">Ver menú</span>
            </>
          )}
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-full lg:w-1/4 mb-6 lg:mb-0 lg:pr-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              {userInfo && (
                <div className="text-center mb-6 p-4">
                  <div className="inline-block rounded-full bg-primary text-white p-3 mb-2">
                    <FaUser className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold">{userInfo.name}</h2>
                  <p className="text-gray-500">{userInfo.email}</p>
                </div>
              )}
              
              <nav aria-label="Navegación del panel">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`
                          flex items-center px-4 py-3 rounded-md
                          ${isActive(item.path)
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                        aria-current={isActive(item.path) ? 'page' : undefined}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        )}
        
        {/* Main content */}
        <main className="w-full lg:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// PropTypes validation
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DashboardLayout; 