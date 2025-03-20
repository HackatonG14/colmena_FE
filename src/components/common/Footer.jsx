import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/icon.svg" alt="" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-medium text-gray-900">Colmena</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Conectamos personas para intercambiar habilidades y servicios, 
              construyendo una economía colaborativa y sostenible.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
                aria-label="Visita nuestra página de Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
                aria-label="Visita nuestra página de Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
                aria-label="Visita nuestra página de Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
                aria-label="Visita nuestra página de LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Enlaces */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Explorar</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/shops" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-amber-500 transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Línea divisoria */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} Colmena. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;