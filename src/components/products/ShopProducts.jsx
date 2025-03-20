import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../ui/Rating';
import { AiFillHeart } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';

const ShopProducts = ({ products = [], styles }) => {
    // Función para obtener una imagen segura o un placeholder
    const getImageSrc = (product) => {
        if (product.images && product.images.length > 0) {
            return product.images[0];
        }
        // Usar la propiedad image si existe
        if (product.image) {
            return product.image;
        }
        // Retornar una imagen de placeholder por defecto
        return `https://via.placeholder.com/500x300/e9c46a/ffffff?text=${encodeURIComponent(product.name || 'Servicio')}`;
    };

    return (
        <>
            {styles === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Link to={`/product/details/${product.slug}`}>
                                    <img 
                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                                        src={getImageSrc(product)} 
                                        alt={product.name} 
                                    />
                                </Link>
                                
                                {product.discount > 0 && (
                                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                        -{product.discount}%
                                    </div>
                                )}
                                
                                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-600 hover:text-amber-500 backdrop-blur-sm transition-colors" aria-label="Añadir a favoritos">
                                    <AiFillHeart className="text-lg" />
                                </button>
                            </div>
                            
                            <div className="p-5">
                                <Link to={`/product/details/${product.slug}`}>
                                    <h3 className="text-lg font-medium text-gray-900 hover:text-amber-500 transition-colors mb-2 line-clamp-1">
                                        {product.name}
                                    </h3>
                                </Link>
                                
                                <div className="flex items-center mb-3">
                                    <Rating ratings={product.rating} />
                                    <span className="text-xs text-gray-500 ml-1">({product.review || 0})</span>
                                </div>
                                
                                <div className="flex flex-wrap items-end justify-between">
                                    {product.stock > 0 ? (
                                        <p className="text-green-600 text-sm font-medium">
                                            Disponible
                                        </p>
                                    ) : (
                                        <p className="text-red-500 text-sm font-medium">
                                            No disponible
                                        </p>
                                    )}
                                    
                                    {product.exchangeFor && (
                                        <div className="flex items-center gap-1 text-sm text-amber-600">
                                            <FaExchangeAlt className="text-amber-500" />
                                            <span>{product.hoursRequired} horas</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {products.map((product, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row">
                            <div className="relative md:w-1/3">
                                <Link to={`/product/details/${product.slug}`}>
                                    <img 
                                        className="w-full h-full object-cover aspect-[4/3] md:aspect-auto max-h-60 md:max-h-full" 
                                        src={getImageSrc(product)} 
                                        alt={product.name} 
                                    />
                                </Link>
                                
                                {product.discount > 0 && (
                                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                        -{product.discount}%
                                    </div>
                                )}
                                
                                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-600 hover:text-amber-500 backdrop-blur-sm transition-colors" aria-label="Añadir a favoritos">
                                    <AiFillHeart className="text-lg" />
                                </button>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-auto">
                                    <Link to={`/product/details/${product.slug}`}>
                                        <h3 className="text-xl font-medium text-gray-900 hover:text-amber-500 transition-colors mb-2">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    
                                    <div className="flex items-center mb-3">
                                        <Rating ratings={product.rating} />
                                        <span className="text-sm text-gray-500 ml-2">({product.review || 0} valoraciones)</span>
                                    </div>
                                    
                                    {product.description && (
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                    
                                    {product.exchangeFor && (
                                        <div className="flex items-start gap-2 mb-4 text-gray-700">
                                            <FaExchangeAlt className="text-amber-500 mt-1 flex-shrink-0" />
                                            <p className="line-clamp-2">
                                                <span className="font-medium">Intercambio por:</span> {product.exchangeFor}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
                                    {product.stock > 0 ? (
                                        <p className="text-green-600 text-sm font-medium">
                                            Disponible
                                        </p>
                                    ) : (
                                        <p className="text-red-500 text-sm font-medium">
                                            No disponible
                                        </p>
                                    )}
                                    
                                    <Link
                                        to={`/product/details/${product.slug}`}
                                        className="inline-flex items-center px-4 py-2 rounded-full text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors text-sm font-medium"
                                    >
                                        Ver detalles
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {products.length === 0 && (
                <div className="bg-amber-50 text-center p-8 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-amber-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No hay resultados</h3>
                    <p className="text-gray-600 mb-4">
                        No se encontraron servicios que coincidan con tus criterios de búsqueda.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-4 py-2 rounded-full text-white bg-amber-500 hover:bg-amber-600 transition-colors text-sm font-medium"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}
        </>
    );
};

export default ShopProducts;