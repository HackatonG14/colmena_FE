import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart, FaShoppingCart, FaTrash, FaSadTear } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { toast } from 'react-hot-toast';

/**
 * MyWishlist component displays the user's saved favorite items
 */
const MyWishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { dashboard_data, loader } = useSelector(state => state.dashboard);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Establecer la lista de deseos del usuario desde los datos del dashboard
    if (dashboard_data?.wishlist) {
      setWishlist(dashboard_data.wishlist);
    }
  }, [dashboard_data]);

  const handleRemoveItem = (productId) => {
    // Aquí iría la llamada a la API para eliminar el elemento
    // Por ahora, solo actualizamos el estado local
    setWishlist(wishlist.filter(item => item._id !== productId));
    toast.success('Producto eliminado de favoritos');
  };

  const handleAddToCart = (product) => {
    // Aquí iría la llamada a la API para añadir al carrito
    toast.success('Producto añadido al carrito');
  };

  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mi Lista de Deseos</h1>

      {wishlist && wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <Card 
              key={product._id} 
              className="h-full"
              hover
            >
              <div className="relative pb-[60%] overflow-hidden">
                <img 
                  src={product.image || 'https://via.placeholder.com/300'} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  onClick={() => handleRemoveItem(product._id)}
                  className="absolute top-2 right-2 p-2 bg-white bg-opacity-70 rounded-full text-red-500 hover:bg-opacity-100 transition-all"
                  aria-label="Eliminar de favoritos"
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-4">
                <Link 
                  to={`/product/details/${product.slug}`} 
                  className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors line-clamp-1"
                >
                  {product.name}
                </Link>
                
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                  {product.description || 'Sin descripción disponible'}
                </p>
                
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-600">
                    ${product.price?.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center justify-center p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                    aria-label="Añadir al carrito"
                  >
                    <FaShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FaSadTear className="text-red-500 text-xl" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Tu lista de deseos está vacía</h2>
          <p className="text-gray-500 mb-6">
            Añade tus productos favoritos a la lista de deseos para tenerlos siempre a mano.
          </p>
          <Link 
            to="/shops" 
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <FaHeart className="h-4 w-4" />
            Explorar productos
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyWishlist; 