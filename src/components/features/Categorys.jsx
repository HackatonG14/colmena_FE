import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaLaptopCode, FaPaintBrush, FaLanguage, FaTools, FaUtensils, FaGuitar, FaGraduationCap, FaHome } from 'react-icons/fa';

// Categorías de ejemplo con iconos de React
const mockCategories = [
    {
        _id: '1',
        name: 'Programación',
        image: 'https://via.placeholder.com/150x150?text=Programación',
        icon: <FaLaptopCode className="text-3xl" />,
        description: 'Desarrollo web, apps, y más',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-500'
    },
    {
        _id: '2',
        name: 'Diseño',
        image: 'https://via.placeholder.com/150x150?text=Diseño',
        icon: <FaPaintBrush className="text-3xl" />,
        description: 'Gráfico, UI/UX, ilustración',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-500'
    },
    {
        _id: '3',
        name: 'Idiomas',
        image: 'https://via.placeholder.com/150x150?text=Idiomas',
        icon: <FaLanguage className="text-3xl" />,
        description: 'Clases y traducciones',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-500'
    },
    {
        _id: '4',
        name: 'Reparaciones',
        image: 'https://via.placeholder.com/150x150?text=Reparaciones',
        icon: <FaTools className="text-3xl" />,
        description: 'Electrónicos, hogar, más',
        bgColor: 'bg-gray-50',
        iconColor: 'text-gray-700'
    },
    {
        _id: '5',
        name: 'Cocina',
        image: 'https://via.placeholder.com/150x150?text=Cocina',
        icon: <FaUtensils className="text-3xl" />,
        description: 'Clases de cocina, catering',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-500'
    },
    {
        _id: '6',
        name: 'Música',
        image: 'https://via.placeholder.com/150x150?text=Música',
        icon: <FaGuitar className="text-3xl" />,
        description: 'Clases y producción',
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600'
    },
    {
        _id: '7',
        name: 'Educación',
        image: 'https://via.placeholder.com/150x150?text=Educación',
        icon: <FaGraduationCap className="text-3xl" />,
        description: 'Tutoría y enseñanza',
        bgColor: 'bg-indigo-50',
        iconColor: 'text-indigo-500'
    },
    {
        _id: '8',
        name: 'Hogar',
        image: 'https://via.placeholder.com/150x150?text=Hogar',
        icon: <FaHome className="text-3xl" />,
        description: 'Jardinería, decoración',
        bgColor: 'bg-amber-50',
        iconColor: 'text-amber-500'
    }
];

const Categorys = () => {
    const { categorys: storeCategories } = useSelector(state => state.home);
    const [localCategories] = useState(mockCategories);
    
    // Usar categorías del store si existen, de lo contrario usar categorías locales
    const displayCategories = storeCategories?.length > 0 ? storeCategories : localCategories;

    return (
        <div className='w-full max-w-7xl mx-auto py-12 px-4'>
            <div className='mb-10 text-center'>
                <h2 className='text-3xl font-bold text-gray-800 mb-3'>Explora Categorías</h2>
                <div className='w-24 h-1 bg-amber-500 mx-auto'></div>
                <p className='mt-4 text-gray-600 max-w-md mx-auto'>Descubre servicios por categoría y encuentra lo que necesitas</p>
            </div>
            
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {displayCategories.map((category, i) => (
                    <Link 
                        key={i} 
                        to={`/products?category=${category.name}`}
                        className={`block ${category.bgColor || 'bg-amber-50'} rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md transform hover:-translate-y-1`}
                    >
                        <div className='flex flex-col items-center justify-center'>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${category.iconColor || 'text-amber-500'} bg-white shadow-sm`}>
                                {category.icon || (
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <h3 className='font-semibold text-gray-800 mb-1'>{category.name}</h3>
                            <p className='text-sm text-gray-600'>{category.description || 'Explorar servicios'}</p>
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* Elemento decorativo: patrón de hexágonos (tema de colmena) */}
            <div className="relative mt-16 py-10 px-8 rounded-lg bg-amber-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                    <svg viewBox="0 0 100 100" className="h-full">
                        <pattern id="honeycomb" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                            <path d="M5,0 L10,2.5 L10,7.5 L5,10 L0,7.5 L0,2.5 Z" fill="currentColor" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#honeycomb)" />
                    </svg>
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0 md:mr-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">¿Quieres ofrecer tus servicios?</h3>
                        <p className="text-gray-600">Únete a nuestra comunidad y comienza a intercambiar habilidades</p>
                    </div>
                    <Link 
                        to="/login" 
                        className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-8 rounded-full font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                        Comenzar ahora
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Categorys;