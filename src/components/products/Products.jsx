import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiTimeFill, RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { FaStar } from 'react-icons/fa';

const Products = ({title, products}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Asegurarse de que los productos estén en el formato esperado (array plano)
    const flatProducts = Array.isArray(products) 
        ? (Array.isArray(products[0]) 
            ? products.flat() 
            : products)
        : [];
    
    // Mostrar hasta 4 servicios por slide
    const servicesToShow = 4;
    const totalSlides = Math.ceil(flatProducts.length / servicesToShow);
    
    const next = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };
    
    const previous = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const displayServices = flatProducts.slice(
        currentSlide * servicesToShow, 
        (currentSlide + 1) * servicesToShow
    );

    return (
        <div className='p-5'>
            {/* Encabezado */}
            <div className='flex justify-between items-center mb-6'>
                <h3 className='text-xl font-bold text-gray-800'>{title}</h3>
                <div className='flex items-center gap-2'>
                    <button 
                        onClick={previous} 
                        disabled={totalSlides <= 1}
                        className={`w-8 h-8 flex justify-center items-center rounded-full border ${totalSlides <= 1 ? 'text-gray-300 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-100'} transition-colors`}
                    >
                        <RiArrowLeftSLine className='text-lg' />
                    </button>
                    <button 
                        onClick={next} 
                        disabled={totalSlides <= 1}
                        className={`w-8 h-8 flex justify-center items-center rounded-full border ${totalSlides <= 1 ? 'text-gray-300 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-100'} transition-colors`}
                    >
                        <RiArrowRightSLine className='text-lg' />
                    </button>
                </div>
            </div>
            
            {/* Lista de servicios */}
            <div className='space-y-4'>
                {displayServices.map((service, j) => (
                    <Link 
                        key={j} 
                        to={`/product/details/${service.slug}`}
                        className='flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                        <div className='w-20 h-20 rounded-lg overflow-hidden flex-shrink-0'>
                            <img 
                                className='w-full h-full object-cover' 
                                src={service.images && service.images.length > 0 ? service.images[0] : service.image || 'https://via.placeholder.com/80x80?text=Servicio'} 
                                alt={service.name} 
                            />
                        </div>
                        <div className='ml-3 flex-grow'>
                            <h4 className='font-medium text-gray-800 line-clamp-1 hover:text-amber-500 transition-colors'>{service.name}</h4>
                            <div className='flex items-center gap-4 mt-1 text-xs text-gray-500'>
                                <div className='flex items-center'>
                                    <RiTimeFill className='mr-1 text-amber-500' />
                                    <span>{service.hoursRequired} horas</span>
                                </div>
                                <div className='flex items-center'>
                                    <FaStar className='mr-1 text-amber-500' />
                                    <span>{service.rating || 0}</span>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <span className='text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full'>Intercambio</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* Paginación como puntos */}
            {totalSlides > 1 && (
                <div className='flex justify-center items-center gap-1 mt-4'>
                    {[...Array(totalSlides)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full transition-colors ${i === currentSlide ? 'bg-amber-500' : 'bg-gray-300'}`}
                            onClick={() => setCurrentSlide(i)}
                        />
                    ))}
                </div>
            )}
            
            {/* Ver todos - Link al final */}
            <div className='mt-4 text-right'>
                <Link 
                    to={`/products`} 
                    className='inline-flex items-center text-sm text-amber-600 hover:text-amber-700 transition-colors'
                >
                    Ver todos
                    <RiArrowRightSLine className='ml-1' />
                </Link>
            </div>
        </div>
    );
};

export default Products;