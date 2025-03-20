import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../store/reducers/homeReducer';
import LoadingScreen from '../components/LoadingScreen';
import { FiSearch } from 'react-icons/fi';

/**
 * Categories page component that displays all service categories
 */
const Categories = () => {
  const dispatch = useDispatch();
  const { categorys, loader } = useSelector(state => state.home);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(get_category());
  }, [dispatch]);

  // Sample category images for placeholder
  const getCategoryImage = (index) => {
    const images = [
      'https://via.placeholder.com/800x600/e9c46a/ffffff?text=Categoria',
      'https://via.placeholder.com/800x600/2a9d8f/ffffff?text=Servicios',
      'https://via.placeholder.com/800x600/f4a261/ffffff?text=Intercambio',
      'https://via.placeholder.com/800x600/e76f51/ffffff?text=Habilidades',
      'https://via.placeholder.com/800x600/264653/ffffff?text=Comunidad',
      'https://via.placeholder.com/800x600/eab676/ffffff?text=Colmena'
    ];
    return images[index % images.length];
  };

  // Filter categories based on search term
  const filteredCategories = Array.isArray(categorys) 
    ? categorys.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (loader) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* Header section */}
      <section className="py-12 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-light text-gray-900">
              Categorías de <span className="text-amber-500 font-medium">Servicios</span>
            </h1>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Explora nuestras categorías y encuentra oportunidades de intercambio que se ajusten a tus habilidades e intereses
            </p>
            <div className="mt-4 flex justify-center text-sm">
              <Link 
                to="/" 
                className="text-amber-500 hover:text-amber-600 transition-colors mr-2"
              >
                Inicio
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-700">Categorías</span>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Buscar categorías..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiSearch />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories grid */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        {!Array.isArray(categorys) || filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-amber-100 text-amber-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">No hay categorías disponibles</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm 
                ? `No hay resultados para "${searchTerm}". Intenta con otra búsqueda.` 
                : "No hay categorías de servicios disponibles en este momento."}
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => (
              <Link 
                key={category._id || index} 
                to={`/products?category=${category.name}`}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={category.image || getCategoryImage(index)} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-amber-900/70 transition-colors duration-300"></div>
                </div>
                <div className="relative p-6">
                  <h2 className="text-xl font-medium text-gray-900 group-hover:text-amber-600 transition-colors">{category.name}</h2>
                  <p className="mt-2 text-gray-600 text-sm">
                    {category.description || `Explora servicios de ${category.name} disponibles para intercambio`}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-amber-500 group-hover:text-amber-600 transition-colors">
                      Ver servicios
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories; 