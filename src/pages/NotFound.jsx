import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

/**
 * NotFound component displayed when a page doesn't exist (404 error)
 */
const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Página no encontrada
          </h2>
          
          <p className="text-gray-600 text-lg mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/"
              variant="primary"
            >
              Volver al inicio
            </Button>
            
            <Button
              as={Link}
              to="/shops"
              variant="secondary"
            >
              Ir a la tienda
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 