import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css'
import Rating from '../components/ui/Rating';
import { FaHeart, FaFacebookF, FaTwitter, FaLinkedin, FaGithub, FaExchangeAlt, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import Reviews from '../components/features/Reviews';
import {Pagination } from 'swiper/modules';
import 'swiper/css'; 
import 'swiper/css/pagination';
import {Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { product_details } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';
import { add_to_card, messageClear, add_to_wishlist } from '../store/reducers/cardReducer';

const Details = () => {
    const navigate = useNavigate();
    const {slug} = useParams();
    const dispatch = useDispatch();
    const {product, relatedProducts} = useSelector(state => state.home);
    const {userInfo} = useSelector(state => state.auth);
    const {errorMessage, successMessage} = useSelector(state => state.card);

    useEffect(() => {
        dispatch(product_details(slug));
    }, [slug, dispatch]);

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

    const [image, setImage] = useState('');
    const [state, setState] = useState('reviews');
    const [quantity, setQuantity] = useState(1);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        }
    };

    const inc = () => {
        if (quantity >= product?.stock) {
            toast.error('No hay más disponibilidad');
        } else {
            setQuantity(quantity + 1);
        }
    };

    const dec = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const add_card = () => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity,
                productId: product._id
            }));
        } else {
            navigate('/login');
        }
    };

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }));
        } else {
            navigate('/login');
        }
    };

    const buynow = () => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                products: [
                    {
                        quantity,
                        productInfo: product
                    }
                ]
            }
        ];
        
        navigate('/shipping', {
            state: {
                products: obj,
                items: 1
            }
        });
    };

    return (
        <div className='w-full'>
            {/* Banner */}
            <section className="bg-amber-50 py-16">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-light text-gray-900 mb-4">Detalles del Servicio</h1>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Información detallada sobre este servicio y opciones de intercambio
                        </p>
                        <div className="mt-6 flex justify-center">
                            <Link 
                                to="/" 
                                className="text-amber-500 hover:text-amber-600 transition-colors mr-2"
                            >
                                Inicio
                            </Link>
                            <span className="text-gray-400 mx-2">/</span>
                            <Link 
                                to="/shops" 
                                className="text-amber-500 hover:text-amber-600 transition-colors mr-2"
                            >
                                Servicios
                            </Link>
                            <span className="text-gray-400 mx-2">/</span>
                            <span className="text-gray-700 truncate max-w-[200px]">{product?.name}</span>
                        </div>
                        <div className="mt-6">
                            <Link 
                                to="/shops" 
                                className="inline-flex items-center px-4 py-2 bg-white text-amber-600 rounded-full shadow-sm hover:bg-amber-50 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver a servicios
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detalles del producto */}
            <section className="py-16">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Galería de imágenes */}
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6 group relative">
                                <img 
                                    className="w-full h-[450px] object-contain p-4 transition-all duration-300 group-hover:scale-[1.02]" 
                                    src={image || (product?.images && product.images[0])} 
                                    alt={product?.name} 
                                />
                                {product?.discount > 0 && (
                                    <div className="absolute top-4 left-4 bg-amber-500 text-white text-sm font-medium px-4 py-1 rounded-full shadow-sm">
                                        -{product.discount}%
                                    </div>
                                )}
                            </div>
                            
                            {product?.images && (
                                <div className="py-3">
                                    <Carousel
                                        autoPlay={true}
                                        infinite={true} 
                                        responsive={responsive}
                                        transitionDuration={500}
                                        removeArrowOnDeviceType={["mobile", "smmobile", "xsmobile"]}
                                        itemClass="px-1"
                                    >
                                        {product.images.map((img, i) => (
                                            <div key={i} onClick={() => setImage(img)} className="h-24 w-full">
                                                <img 
                                                    className={`h-full w-full object-cover cursor-pointer rounded-xl border-2 ${image === img ? 'border-amber-500 shadow-md' : 'border-transparent'} hover:border-amber-300 transition-all`}
                                                    src={img} 
                                                    alt={`${product.name} - imagen ${i+1}`} 
                                                /> 
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            )}
                        </div>
                        
                        {/* Información del producto */}
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-3xl font-light text-gray-900 mb-6">{product?.name}</h1>
                            
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex">
                                    <Rating ratings={product?.rating || 0} />
                                </div>
                                <span className="text-gray-500">({product?.review || 0} valoraciones)</span>
                                {product?.stock > 0 ? (
                                    <span className="ml-auto text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full">
                                        Disponible
                                    </span>
                                ) : (
                                    <span className="ml-auto text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-full">
                                        No disponible
                                    </span>
                                )}
                            </div>
                            
                            {product?.hoursRequired && (
                                <div className="mb-6 bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm">Tiempo requerido</p>
                                            <p className="font-medium text-gray-900">{product.hoursRequired} horas</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {product?.exchangeFor && (
                                <div className="mb-8 p-5 bg-amber-50 rounded-2xl">
                                    <div className="flex items-start gap-3">
                                        <FaExchangeAlt className="text-amber-500 text-xl mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">Intercambio posible por:</h3>
                                            <p className="text-gray-600 leading-relaxed">{product.exchangeFor}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {product?.stock > 0 && (
                                <div className="mb-8">
                                    <h3 className="font-medium text-gray-900 mb-3">Cantidad:</h3>
                                    <div className="flex items-center">
                                        <div className="inline-flex items-center border border-gray-200 rounded-full overflow-hidden shadow-sm bg-white">
                                            <button 
                                                onClick={dec}
                                                className="p-3 text-gray-400 hover:text-amber-500 hover:bg-gray-50 transition-all"
                                                disabled={quantity === 1}
                                            >
                                                <FaMinusCircle size={18} />
                                            </button>
                                            <div className="w-12 h-full border-l border-r border-gray-200 flex items-center justify-center font-medium text-gray-800">
                                                {quantity}
                                            </div>
                                            <button 
                                                onClick={inc}
                                                className="p-3 text-gray-400 hover:text-amber-500 hover:bg-gray-50 transition-all"
                                                disabled={quantity >= product.stock}
                                            >
                                                <FaPlusCircle size={18} />
                                            </button>
                                        </div>
                                        <div className="ml-4">
                                            <span className="text-sm text-gray-500">
                                                {product.stock} {product.stock === 1 ? 'disponible' : 'disponibles'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex flex-wrap gap-4 mb-10">
                                <button 
                                    onClick={add_card}
                                    disabled={product?.stock <= 0}
                                    className={`px-8 py-3 rounded-full font-medium ${
                                        product?.stock > 0 
                                            ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:shadow'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    } transition-all flex-1 flex items-center justify-center`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Agregar a mi lista
                                </button>
                                <button 
                                    onClick={add_wishlist}
                                    className="p-3 border border-amber-500 text-amber-500 rounded-full font-medium hover:bg-amber-50 transition-colors shadow-sm"
                                    aria-label="Agregar a favoritos"
                                    title="Agregar a favoritos"
                                >
                                    <FaHeart />
                                </button>
                                <button 
                                    onClick={buynow}
                                    disabled={product?.stock <= 0}
                                    className={`px-8 py-3 rounded-full font-medium ${
                                        product?.stock > 0 
                                            ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    } transition-all flex-1 flex items-center justify-center`}
                                >
                                    <FaExchangeAlt className="mr-2" />
                                    Intercambiar ahora
                                </button>
                            </div>
                            
                            <div className="mb-6 border-t border-gray-100 pt-6">
                                <p className="font-medium text-gray-900 mb-3">Categoría:</p>
                                <Link 
                                    to={`/products?category=${product?.category}`}
                                    className="inline-block bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-full text-sm hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm"
                                >
                                    {product?.category}
                                </Link>
                            </div>
                            
                            <div className="mb-4">
                                <p className="font-medium text-gray-900 mb-3">Compartir:</p>
                                <div className="inline-flex gap-3 rounded-full bg-gray-50 p-2">
                                    <a 
                                        href="#" 
                                        className="w-9 h-9 rounded-full bg-white shadow-sm text-gray-600 flex items-center justify-center hover:bg-[#3b5998] hover:text-white transition-all"
                                        aria-label="Compartir en Facebook"
                                    >
                                        <FaFacebookF />
                                    </a>
                                    <a 
                                        href="#" 
                                        className="w-9 h-9 rounded-full bg-white shadow-sm text-gray-600 flex items-center justify-center hover:bg-[#1da1f2] hover:text-white transition-all"
                                        aria-label="Compartir en Twitter"
                                    >
                                        <FaTwitter />
                                    </a>
                                    <a 
                                        href="#" 
                                        className="w-9 h-9 rounded-full bg-white shadow-sm text-gray-600 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all"
                                        aria-label="Compartir en LinkedIn"
                                    >
                                        <FaLinkedin />
                                    </a>
                                    <a 
                                        href="#" 
                                        className="w-9 h-9 rounded-full bg-white shadow-sm text-gray-600 flex items-center justify-center hover:bg-[#333] hover:text-white transition-all"
                                        aria-label="Compartir en GitHub"
                                    >
                                        <FaGithub />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Descripción y reviews */}
                    <div className="mt-16">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="flex justify-center border-b border-gray-100">
                                <button 
                                    onClick={() => setState('description')}
                                    className={`px-8 py-4 font-medium relative ${state === 'description' ? 'text-amber-500' : 'text-gray-600 hover:text-gray-900 transition-colors'}`}
                                >
                                    Descripción
                                    {state === 'description' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></span>
                                    )}
                                </button>
                                <button 
                                    onClick={() => setState('reviews')}
                                    className={`px-8 py-4 font-medium relative ${state === 'reviews' ? 'text-amber-500' : 'text-gray-600 hover:text-gray-900 transition-colors'}`}
                                >
                                    Valoraciones
                                    {state === 'reviews' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></span>
                                    )}
                                </button>
                            </div>
                            
                            <div className="p-8">
                                {state === 'description' ? (
                                    <div>
                                        <div className="prose prose-amber max-w-none">
                                            <p className="text-gray-700 leading-relaxed">
                                                {product?.description || 'No hay descripción disponible para este servicio.'}
                                            </p>
                                            
                                            {product?.features && product.features.length > 0 && (
                                                <div className="mt-6">
                                                    <h4 className="text-xl font-light text-gray-900 mb-4">Características destacadas</h4>
                                                    <ul className="space-y-2">
                                                        {product.features.map((feature, idx) => (
                                                            <li key={idx} className="flex items-start">
                                                                <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                <span className="text-gray-700">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Reviews product={product} />
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Productos relacionados */}
                    {relatedProducts?.length > 0 && (
                        <div className="mt-20">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-light text-gray-900">Servicios <span className="text-amber-500 font-medium">relacionados</span></h2>
                                <Link 
                                    to="/shops" 
                                    className="text-amber-500 hover:text-amber-600 flex items-center gap-1"
                                >
                                    Ver todos
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={24}
                                pagination={{
                                    clickable: true,
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                    },
                                }}
                                modules={[Pagination]}
                                className="mySwiper pb-12"
                            >
                                {relatedProducts.map((p, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <Link to={`/product/details/${p.slug}`}>
                                                    <img 
                                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                                                        src={p.images[0]} 
                                                        alt={p.name} 
                                                    />
                                                </Link>
                                                
                                                {p.discount > 0 && (
                                                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                                        -{p.discount}%
                                                    </div>
                                                )}
                                                
                                                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-600 hover:text-amber-500 backdrop-blur-sm transition-colors" aria-label="Añadir a favoritos">
                                                    <FaHeart className="text-sm" />
                                                </button>
                                            </div>
                                            
                                            <div className="p-5">
                                                <Link to={`/product/details/${p.slug}`}>
                                                    <h3 className="text-lg font-medium text-gray-900 hover:text-amber-500 transition-colors mb-2 line-clamp-1">
                                                        {p.name}
                                                    </h3>
                                                </Link>
                                                
                                                <div className="flex items-center mb-3">
                                                    <Rating ratings={p.rating} />
                                                    <span className="text-xs text-gray-500 ml-1">({p.review})</span>
                                                </div>
                                                
                                                <div className="flex items-center justify-between">
                                                    {p.hoursRequired && (
                                                        <div className="flex items-center gap-1 text-gray-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span className="text-sm">{p.hoursRequired} horas</span>
                                                        </div>
                                                    )}
                                                    
                                                    {p.exchangeFor && (
                                                        <div className="flex items-center gap-1 text-sm text-amber-600">
                                                            <FaExchangeAlt className="text-amber-500" />
                                                            <span>Intercambio</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Details;