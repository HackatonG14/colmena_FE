import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css'
import Rating from '../components/ui/Rating';
import { FaHeart, FaFacebookF, FaTwitter, FaLinkedin, FaGithub, FaExchangeAlt, FaMinusCircle, FaPlusCircle, FaInstagram, FaCheck } from "react-icons/fa";
import Reviews from '../components/features/Reviews';
import {Pagination } from 'swiper/modules';
import 'swiper/css'; 
import 'swiper/css/pagination';
import {Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { product_details } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';
import { add_to_card, messageClear, add_to_wishlist } from '../store/reducers/cardReducer';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';

// Componente para mostrar la descripción del producto
const DetailsDescription = ({ description }) => {
    return (
        <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed mb-6">
                {description ? (
                    <p>{description}</p>
                ) : (
                    <p>No hay descripción disponible para este servicio.</p>
                )}
            </div>
            
            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">¿Cómo funciona este intercambio?</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-amber-50/50 p-4 rounded-2xl flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
                            <span className="text-xl">1</span>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800 mb-1">Solicita el servicio</h4>
                            <p className="text-sm text-gray-600">Añade este servicio a tu lista de intercambio y contacta al proveedor.</p>
                        </div>
                    </div>
                    
                    <div className="bg-amber-50/50 p-4 rounded-2xl flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
                            <span className="text-xl">2</span>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800 mb-1">Acuerda los detalles</h4>
                            <p className="text-sm text-gray-600">Define fecha, horario y otros detalles importantes.</p>
                        </div>
                    </div>
                    
                    <div className="bg-amber-50/50 p-4 rounded-2xl flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
                            <span className="text-xl">3</span>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800 mb-1">Recibe el servicio</h4>
                            <p className="text-sm text-gray-600">Disfruta del servicio proporcionado por otro miembro de la comunidad.</p>
                        </div>
                    </div>
                    
                    <div className="bg-amber-50/50 p-4 rounded-2xl flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
                            <span className="text-xl">4</span>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800 mb-1">Valora la experiencia</h4>
                            <p className="text-sm text-gray-600">Deja tu valoración para ayudar a otros miembros de la comunidad.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Details = () => {
    const navigate = useNavigate();
    const {slug} = useParams();
    const dispatch = useDispatch();
    const {product, relatedProducts, loader} = useSelector(state => state.home);
    const {userInfo} = useSelector(state => state.auth);
    const {errorMessage, successMessage} = useSelector(state => state.card);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState('');
    const [state, setState] = useState('reviews');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('descripcion');

    useEffect(() => {
        dispatch(product_details(slug));
        // Simulamos un tiempo de carga para la demo
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [slug, dispatch]);

    // Datos demo para usar cuando no hay conexión con la API
    const demoProduct = {
        _id: 'demo-product',
        name: slug ? slug.split('-').join(' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : 'Servicio de Demostración',
        slug: slug || 'servicio-demo',
        price: 5,
        discount: 0,
        stock: 10,
        description: 'Este es un servicio de demostración creado para mostrar cómo funciona la plataforma de intercambio de servicios. Los miembros de la comunidad ofrecen su tiempo y habilidades a cambio de otros servicios.',
        category: 'Tecnología',
        images: [
            'https://via.placeholder.com/600x400/FFB800/ffffff?text=Servicio+Demo+1',
            'https://via.placeholder.com/600x400/FFB800/ffffff?text=Servicio+Demo+2',
            'https://via.placeholder.com/600x400/FFB800/ffffff?text=Servicio+Demo+3'
        ],
        rating: 4.5,
        review: [],
        shopInfo: {
            shopName: 'Demo Provider',
            city: 'Ciudad Demo',
            country: 'País Demo'
        }
    };

    const demoRelatedProducts = Array(4).fill().map((_, i) => ({
        _id: `demo-related-${i}`,
        name: `Servicio Relacionado ${i+1}`,
        slug: `servicio-relacionado-${i+1}`,
        price: Math.floor(Math.random() * 10) + 1,
        discount: 0,
        images: [`https://via.placeholder.com/600x400/${['e9c46a', '2a9d8f', 'e76f51', '264653'][i%4]}/ffffff?text=Servicio+${i+1}`],
        rating: Math.random() * 5
    }));

    // Usamos los datos reales de la API o los datos demo si hay error
    const displayProduct = product?.name ? product : demoProduct;
    const displayRelatedProducts = relatedProducts?.length > 0 ? relatedProducts : demoRelatedProducts;

    useEffect(() => {
        if (displayProduct?.images?.length > 0 && !image) {
            setImage(displayProduct.images[0]);
        }
    }, [displayProduct, image]);

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
        if (quantity >= displayProduct?.stock) {
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
                productId: displayProduct._id
            }));
        } else {
            navigate('/login');
        }
    };

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: displayProduct._id,
                name: displayProduct.name,
                price: displayProduct.price,
                image: displayProduct.images?.[0],
                discount: displayProduct.discount,
                rating: displayProduct.rating,
                slug: displayProduct.slug
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
                sellerId: displayProduct.sellerId,
                shopName: displayProduct.shopName,
                products: [
                    {
                        quantity,
                        productInfo: displayProduct
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

    // Restaurar el useEffect para mensajes
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

    return (
        <div className="pt-0 bg-white min-h-screen">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
            ) : (
                <div className="w-[85%] md:w-[90%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                    <div className="py-5 flex items-center justify-start gap-3 text-sm">
                        <Link to="/" className="text-amber-500 hover:text-amber-600 transition-colors">Inicio</Link>
                        <span className="text-gray-400">/</span>
                        <Link to={`/category-shop?category=${displayProduct?.category}`} className="text-amber-500 hover:text-amber-600 transition-colors">{displayProduct?.category}</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600 line-clamp-1">{displayProduct?.name}</span>
                    </div>
                    <div className="pb-10 bg-white text-slate-600">
                        <div className="w-full flex flex-wrap md:flex-row gap-8">
                            {/* Imagen y galería */}
                            <div className="w-full md:w-[48%] bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                                <div className="w-full h-[500px] relative group">
                                    {displayProduct?.discount > 0 && <div className="absolute -rotate-90 flex justify-center items-center text-white font-medium h-8 w-32 top-5 -left-7 z-10 bg-amber-500 rounded-r-full">-{displayProduct.discount}%</div>}
                                    <img 
                                        className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-300" 
                                        src={image} 
                                        alt={displayProduct?.name} 
                                    />
                                </div>
                                <div className="py-3">
                                    <div className="flex gap-2 w-full flex-wrap">
                                        {
                                            displayProduct?.images?.map((img, i) => {
                                                return (
                                                    <div
                                                        onClick={() => setImage(img)}
                                                        key={i}
                                                        className={`h-[120px] overflow-hidden rounded-xl border cursor-pointer hover:shadow-md transition-shadow duration-300 ${img === image ? 'border-amber-500 shadow-md' : 'border-gray-200'}`}
                                                    >
                                                        <img className="w-full h-full object-cover object-top" src={img} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-[48%] flex flex-col gap-4">
                                <div className="bg-white rounded-3xl shadow-sm p-5 border border-gray-100">
                                    <div className="text-2xl text-slate-600 font-bold">
                                        <h2>{displayProduct?.name}</h2>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-start md:items-center gap-2 py-4 md:py-6">
                                        <div className="flex">
                                            <Rating ratings={displayProduct?.rating} />
                                        </div>
                                        <span className="text-sm text-gray-500">({displayProduct?.review?.length} valoraciones)</span>
                                        <div className="flex gap-3 items-center text-sm text-gray-500">
                                            <span>|</span>
                                            <div className="flex gap-2">
                                                <Link to="" className="h-7 w-7 rounded-full flex justify-center items-center bg-amber-50 hover:bg-amber-100 transition-colors text-blue-500 shadow-sm">
                                                    <FaFacebookF />
                                                </Link>
                                                <Link to="" className="h-7 w-7 rounded-full flex justify-center items-center bg-amber-50 hover:bg-amber-100 transition-colors text-blue-400 shadow-sm">
                                                    <FaTwitter />
                                                </Link>
                                                <Link to="" className="h-7 w-7 rounded-full flex justify-center items-center bg-amber-50 hover:bg-amber-100 transition-colors text-pink-500 shadow-sm">
                                                    <FaInstagram />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50/80 px-4 py-4 rounded-2xl mb-4">
                                        <h2 className="text-lg font-medium text-gray-800 mb-3">Descripción</h2>
                                        <p className="text-sm text-gray-600 leading-relaxed">{displayProduct?.description}</p>
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 rounded-full bg-amber-100 flex justify-center items-center text-amber-500">
                                                    <FaCheck size={10} />
                                                </div>
                                                <span className="text-sm">Servicio personalizado</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 rounded-full bg-amber-100 flex justify-center items-center text-amber-500">
                                                    <FaCheck size={10} />
                                                </div>
                                                <span className="text-sm">Calidad garantizada</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 rounded-full bg-amber-100 flex justify-center items-center text-amber-500">
                                                    <FaCheck size={10} />
                                                </div>
                                                <span className="text-sm">Atención al detalle</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 rounded-full bg-amber-100 flex justify-center items-center text-amber-500">
                                                    <FaCheck size={10} />
                                                </div>
                                                <span className="text-sm">Experiencia comprobada</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 pb-3 items-center">
                                        <div className="text-gray-800 flex flex-col gap-1">
                                            <span className="text-lg font-bold">{displayProduct?.price} horas</span>
                                            <div className="flex items-center gap-3">
                                                <Link to={`/category-shop?category=${displayProduct?.category}`} className="bg-amber-100 text-amber-500 px-3 py-1 rounded-full text-sm shadow-sm hover:bg-amber-200 transition-colors">
                                                    {displayProduct?.category}
                                                </Link>
                                                <div className="px-3 py-1 bg-green-100 text-green-500 text-sm rounded-full">
                                                    {displayProduct?.stock > 0 ? 'Disponible' : 'No disponible'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 pb-10 border-b border-slate-200">
                                        <div className="flex bg-amber-50 h-12 w-32 rounded-full border border-gray-200 shadow-sm justify-center items-center">
                                            <button onClick={dec} className="h-full text-lg flex items-center justify-center w-12 text-slate-600 rounded-l-full hover:bg-amber-100 transition-colors">-</button>
                                            <span className="font-semibold w-8 text-center">{quantity}</span>
                                            <button onClick={inc} className="h-full text-lg flex items-center justify-center w-12 text-slate-600 rounded-r-full hover:bg-amber-100 transition-colors">+</button>
                                        </div>
                                        <div className="w-full">
                                            <button onClick={add_card} className="px-5 py-3 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors text-sm font-medium w-full shadow-sm">
                                                Añadir a la cola de intercambio
                                            </button>
                                        </div>
                                        <div className="w-[40px] h-[40px] flex justify-center items-center bg-gray-100 text-amber-500 rounded-full shadow-sm hover:bg-amber-50 cursor-pointer">
                                            <AiFillHeart />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-3xl shadow-sm p-5 border border-gray-100">
                                    <h2 className="text-slate-600 font-bold mb-3">Detalles del servicio</h2>
                                    <div className="flex flex-col gap-3 text-sm">
                                        <div className="flex justify-start gap-3 items-center">
                                            <span className="w-36 text-gray-500">Ubicación:</span>
                                            <span className="text-gray-800">{displayProduct?.shopInfo?.city}, {displayProduct?.shopInfo?.country}</span>
                                        </div>
                                        <div className="flex justify-start gap-3 items-center">
                                            <span className="w-36 text-gray-500">Categoría:</span>
                                            <span className="text-gray-800">{displayProduct?.category}</span>
                                        </div>
                                        <div className="flex justify-start gap-3 items-center">
                                            <span className="w-36 text-gray-500">Horas requeridas:</span>
                                            <span className="text-gray-800">{displayProduct?.price} horas</span>
                                        </div>
                                        <div className="flex justify-start gap-3 items-center">
                                            <span className="w-36 text-gray-500">Valoración:</span>
                                            <div className="flex items-center gap-1">
                                                <Rating ratings={displayProduct?.rating} />
                                                <span className="text-gray-800">({displayProduct?.review?.length})</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-start gap-3 items-center">
                                            <span className="w-36 text-gray-500">Ofrecido por:</span>
                                            <span className="text-gray-800">{displayProduct?.shopInfo?.shopName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-10">
                        <div className="flex justify-center items-center md:gap-10 gap-3 pb-4">
                            <div className={`py-1 text-lg relative cursor-pointer ${activeTab === 'descripcion' ? 'text-amber-500 font-medium' : 'text-gray-500'}`} onClick={() => setActiveTab('descripcion')}>
                                Descripción
                                {activeTab === 'descripcion' && <div className="w-full h-[3px] bg-amber-500 absolute bottom-0 left-0 rounded-full"></div>}
                            </div>
                            <div className={`py-1 text-lg relative cursor-pointer ${activeTab === 'reviews' ? 'text-amber-500 font-medium' : 'text-gray-500'}`} onClick={() => setActiveTab('reviews')}>
                                Valoraciones ({displayProduct?.review?.length})
                                {activeTab === 'reviews' && <div className="w-full h-[3px] bg-amber-500 absolute bottom-0 left-0 rounded-full"></div>}
                            </div>
                        </div>
                        <div className="pt-4">
                            {
                                activeTab === 'descripcion' ? <DetailsDescription description={displayProduct?.description} /> : <Reviews reviews={displayProduct?.review} product={displayProduct} />
                            }
                        </div>
                    </div>
                    <div className="pb-10">
                        <h2 className="text-2xl font-medium text-gray-800 pb-6">Servicios relacionados</h2>
                        <div>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={10}
                                pagination={{
                                    clickable: true,
                                    el: null
                                }}
                                breakpoints={{
                                    340: {
                                        slidesPerView: 1,
                                        spaceBetween: 15
                                    },
                                    440: {
                                        slidesPerView: 2,
                                        spaceBetween: 15
                                    },
                                    680: {
                                        slidesPerView: 3,
                                        spaceBetween: 15
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 15
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        spaceBetween: 15
                                    }
                                }}
                                modules={[Pagination]}
                                className='mySwiper'
                            >
                                {
                                    displayRelatedProducts?.map((item, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <Link to={`/product/details/${item.slug}`}>
                                                    <div className="overflow-hidden rounded-3xl border shadow-sm border-gray-100 bg-white group relative mb-8">
                                                        {item.discount > 0 && <div className="absolute text-white bg-amber-500 p-1 px-2 rounded-full text-xs z-20 top-2 left-2">-{item.discount}%</div>}
                                                        <div className="w-full h-[220px] overflow-hidden bg-gray-50 relative">
                                                            <img
                                                                className="w-full h-full rounded-t-3xl object-cover object-top group-hover:scale-110 transition-transform duration-300"
                                                                src={item.images[0]}
                                                                alt={item.name}
                                                            />
                                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                        </div>
                                                        <div className="p-4">
                                                            <h2 className="text-lg font-medium text-gray-800 line-clamp-1 group-hover:text-amber-500 transition-colors">
                                                                {item.name}
                                                            </h2>
                                                            <div className="flex justify-between items-center mt-2">
                                                                <div className="flex text-amber-500 text-xs">
                                                                    <AiFillStar />
                                                                    <AiFillStar />
                                                                    <AiFillStar />
                                                                    <AiFillStar />
                                                                    <CiStar />
                                                                </div>
                                                                <span className="text-sm font-medium text-amber-500">{item.price} horas</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;