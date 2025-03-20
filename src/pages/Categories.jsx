import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../store/reducers/homeReducer';
import LoadingScreen from '../components/LoadingScreen';

/**
 * Categories page component that displays all product categories
 */
const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loader } = useSelector(state => state.home);

  useEffect(() => {
    dispatch(get_category());
  }, [dispatch]);

  // Sample category images for placeholder
  const getCategoryImage = (index) => {
    const images = [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
    ];
    return images[index % images.length];
  };

  if (loader) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3">Categorías de Productos</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explora nuestras categorías de productos y encuentra exactamente lo que estás buscando.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No hay categorías disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category._id} 
              to={`/products?category=${category.name}`}
              className="group overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                <img 
                  src={category.image || getCategoryImage(index)} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h2 className="text-xl font-bold text-white">{category.name}</h2>
                  <p className="text-gray-200 text-sm">
                    {category.description || `Explorar productos en ${category.name}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories; 