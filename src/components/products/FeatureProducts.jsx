import React, { useEffect } from 'react';
import { FaEye, FaRegHeart, FaExchangeAlt } from "react-icons/fa";
import { RiTimeFill } from "react-icons/ri";
import Rating from '../ui/Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_card, add_to_wishlist, messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const FeatureProducts = ({ products }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { errorMessage, successMessage } = useSelector(state => state.card);

    const express_interest = (id) => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }));
        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const add_wishlist = (service) => {
        if (!userInfo) {
            navigate('/login');
            return;
        }
        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: service._id,
            name: service.name,
            price: service.price,
            image: service.images && service.images.length > 0 ? service.images[0] : service.image || 'https://via.placeholder.com/300x300?text=Imagen+No+Disponible',
            discount: service.discount || 0,
            rating: service.rating || 0,
            slug: service.slug
        }));
    }

    return (
        <div className='w-full max-w-7xl mx-auto pt-0 pb-16 px-4'>
            <div className='mb-12 text-center'>
                <h2 className='text-3xl font-bold text-gray-800 mb-3'>Servicios Destacados</h2>
                <div className='w-24 h-1 bg-amber-500 mx-auto'></div>
                <p className='mt-4 text-gray-600 max-w-md mx-auto'>Descubre los servicios más populares dentro de nuestra comunidad de intercambio</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {
                    products.map((service, i) => (
                        <div
                            key={i}
                            className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1'
                        >
                            <div className='relative'>
                                {/* Badge para servicios destacados */}
                                {service.discount ? (
                                    <div className='absolute top-3 left-3 z-10 bg-amber-500 text-white text-xs font-medium px-2.5 py-1 rounded-full'>
                                        Destacado
                                    </div>
                                ) : null}

                                {/* Imagen del servicio */}
                                <div className='relative overflow-hidden aspect-video'>
                                    <img
                                        className='w-full h-full object-cover transition-transform duration-500 hover:scale-110'
                                        src={service.images && service.images.length > 0 ? service.images[0] : service.image || 'https://via.placeholder.com/300x300?text=Imagen+No+Disponible'}
                                        alt={service.name}
                                    />

                                    {/* Acciones rápidas */}
                                    <div className='absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3'>
                                        <button
                                            onClick={() => add_wishlist(service)}
                                            className='w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-amber-500 transition-colors shadow-md hover:shadow-lg'
                                        >
                                            <FaRegHeart className="text-sm" />
                                        </button>
                                        <Link
                                            to={`/product/details/${service.slug}`}
                                            className='w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-amber-500 transition-colors shadow-md hover:shadow-lg'
                                        >
                                            <FaEye className="text-sm" />
                                        </Link>
                                        <button
                                            onClick={() => express_interest(service._id)}
                                            className='w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg'
                                        >
                                            <FaExchangeAlt className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Información del servicio */}
                            <div className='p-5 flex flex-col flex-grow'>
                                <Link to={`/product/details/${service.slug}`} className='block'>
                                    <h3 className='font-semibold text-gray-800 text-lg mb-2 hover:text-amber-500 transition-colors'>{service.name}</h3>
                                </Link>

                                <div className='flex items-center text-amber-600 mb-3 text-sm'>
                                    <RiTimeFill className='mr-1' />
                                    <span>{service.hoursRequired} horas requeridas</span>
                                </div>

                                <div className='flex justify-between items-center mb-2'>
                                    <div className='flex'>
                                        <Rating ratings={service.rating || 0} />
                                    </div>
                                    <span className='text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full'>Intercambio</span>
                                </div>

                                {service.exchangeFor && (
                                    <div className='mt-auto pt-3 text-xs text-gray-600 border-t border-gray-100'>
                                        <span className='font-medium'>Se intercambia por:</span> {service.exchangeFor}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Botón para ver más */}
            <div className='text-center mt-12'>
                <Link
                    to='/shops'
                    className='inline-flex items-center justify-center gap-2 bg-white border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-colors px-8 py-3 rounded-full font-medium'
                >
                    Ver todos los servicios
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default FeatureProducts;