import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch, FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { logout } from '../../store/reducers/authReducer';
import { theme } from '../../utils/theme';
import Button from '../ui/Button';
import { toast } from '../ui/Toast';

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { card_products } = useSelector(state => state.card);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  // Implement scroll listener for header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('#mobile-menu-button') && !e.target.closest('#mobile-menu')) {
        setIsMenuOpen(false);
      }
      
      if (isUserMenuOpen && !e.target.closest('#user-menu-button') && !e.target.closest('#user-menu')) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen, isUserMenuOpen]);
  
  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);
  
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Sesión cerrada correctamente');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    // Redirect to search page with query parameter
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
  };
  
  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Tienda', path: '/shops' },
    { name: 'Categorías', path: '/categories' },
    { name: 'Contacto', path: '/contact' }
  ];
  
  return (
    <header 
      className={`
        sticky top-0 z-50 bg-white
        transition-shadow duration-300
        ${scrolled ? 'shadow-md' : ''}
      `}
      aria-label="Encabezado del sitio"
    >
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Colmena - Ir a la página principal">
            <img src="/logo.svg" alt="" className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-primary">Colmena</span>
          </Link>
          
          {/* Search on desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar productos"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-label="Buscar"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-medium transition-colors
                  ${pathname === link.path 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-700 hover:text-primary'
                  }
                `}
                aria-current={pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Cart icon with badge */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-primary"
              aria-label={`Ver carrito${card_products.length > 0 ? ` con ${card_products.length} artículos` : ''}`}
            >
              <FaShoppingCart className="h-5 w-5" />
              {card_products.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {card_products.length}
                </span>
              )}
            </Link>
            
            {/* User menu */}
            <div className="relative">
              <button
                id="user-menu-button"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
                aria-controls="user-menu"
              >
                <FaUserCircle className="h-6 w-6 mr-1" />
                <span className="hidden lg:block ml-1">{userInfo ? userInfo.name.split(' ')[0] : 'Cuenta'}</span>
                <FaChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div
                  id="user-menu"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {userInfo ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Mi cuenta
                      </Link>
                      <Link
                        to="/dashboard/my-orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Mis pedidos
                      </Link>
                      <Link
                        to="/dashboard/my-wishlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Lista de deseos
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Iniciar sesión
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link
              to="/cart"
              className="relative p-2 mr-2 text-gray-700"
              aria-label={`Ver carrito${card_products.length > 0 ? ` con ${card_products.length} artículos` : ''}`}
            >
              <FaShoppingCart className="h-5 w-5" />
              {card_products.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {card_products.length}
                </span>
              )}
            </Link>
            
            <button
              id="mobile-menu-button"
              className="p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white shadow-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
        >
          {/* Search on mobile */}
          <div className="p-4 border-b border-gray-200">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar productos"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-label="Buscar"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          
          {/* Mobile navigation links */}
          <nav className="px-4 pt-2 pb-4" aria-label="Navegación móvil">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      block py-2 px-3 rounded-md text-base font-medium
                      ${pathname === link.path 
                        ? 'bg-primary-light/10 text-primary' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    aria-current={pathname === link.path ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 mt-4 pt-4">
              {userInfo ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-gray-500">
                    Hola, {userInfo.name.split(' ')[0]}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Mi cuenta
                  </Link>
                  <Link
                    to="/dashboard/my-orders"
                    className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Mis pedidos
                  </Link>
                  <Link
                    to="/dashboard/my-wishlist"
                    className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Lista de deseos
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    as={Link}
                    to="/login"
                    variant="primary"
                    fullWidth
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="outline"
                    fullWidth
                  >
                    Registrarse
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;