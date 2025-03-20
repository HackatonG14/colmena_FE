import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { get_card_products, delete_card_product, messageClear, quantity_inc, quantity_dec } from '../store/reducers/cardReducer';
import { FaExchangeAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const Card = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { card_products, successMessage, price, buy_product_item, shipping_fee, outofstock_products } = useSelector(state => state.card);

    const navigate = useNavigate();

    // Placeholder de servicios de intercambio si no hay productos en el carrito 
    const [mockServices] = useState([
        {
            _id: '1',
            name: 'Servicio de Diseño Web',
            slug: 'servicio-diseno-web',
            exchangeFor: 'Clases de cocina, reparaciones del hogar, asesoría legal',
            hoursRequired: 20,
            image: 'https://via.placeholder.com/500x300/e9c46a/ffffff?text=Diseño+Web',
        },
        {
            _id: '2',
            name: 'Clases de Idiomas',
            slug: 'clases-idiomas',
            exchangeFor: 'Diseño gráfico, reparación de electrónicos, clases de música',
            hoursRequired: 10,
            image: 'https://via.placeholder.com/500x300/2a9d8f/ffffff?text=Clases+de+Idiomas',
        }
    ]);

    useEffect(() => {
        if (userInfo && userInfo.id) {
            dispatch(get_card_products(userInfo.id));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            if (userInfo && userInfo.id) {
                dispatch(get_card_products(userInfo.id));
            }
        }
    }, [successMessage, dispatch, userInfo]);

    const redirect = () => {
        navigate('/shipping', {
            state: {
                products: card_products,
                price: price,
                shipping_fee: shipping_fee,
                items: buy_product_item
            }
        });
    };

    const handleLoginRedirect = () => {
        navigate('/login', { state: { returnUrl: '/card' } });
    };

    // Si el usuario no está autenticado
    if (!userInfo) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto text-center bg-white rounded-lg shadow-md p-8">
                    <FaExchangeAlt className="text-amber-500 text-5xl mx-auto mb-4" />
                    <h1 className="text-2xl font-semibold mb-4">Tus intercambios de servicios</h1>
                    <p className="text-gray-600 mb-8">
                        Para acceder a tus intercambios de servicios, necesitas iniciar sesión.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                            variant="primary"
                            onClick={handleLoginRedirect}
                            className="px-6 py-2"
                        >
                            Iniciar sesión
                        </Button>
                        <Button 
                            as={Link}
                            to="/shops"
                            variant="outline"
                            className="px-6 py-2"
                        >
                            Explorar servicios
                        </Button>
                    </div>
                    
                    <div className="mt-12 border-t pt-8">
                        <h2 className="text-xl font-medium mb-6">Servicios disponibles para intercambiar</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockServices.map(service => (
                                <Link 
                                    key={service._id}
                                    to={`/product/details/${service.slug}`}
                                    className="flex bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <img 
                                        src={service.image} 
                                        alt={service.name} 
                                        className="w-24 h-24 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-medium">{service.name}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{service.exchangeFor}</p>
                                        <div className="flex items-center mt-2 text-amber-600">
                                            <FaExchangeAlt className="mr-1" />
                                            <span className="text-sm">{service.hoursRequired} horas</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // Si el usuario está autenticado
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">Mis intercambios de servicios</h1>
                <div className="flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-primary">Inicio</Link>
                    <IoIosArrowForward className="mx-1" />
                    <span>Intercambios</span>
                </div>
            </div>

            {card_products.length > 0 || (outofstock_products && outofstock_products.length > 0) ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {card_products.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm mb-6">
                                <div className="p-4 border-b border-gray-100">
                                    <h2 className="text-lg font-medium text-green-600">
                                        Servicios disponibles ({card_products.length})
                                    </h2>
                                </div>
                                
                                {card_products.map((p, i) => (
                                    <div key={i} className="p-4 border-b border-gray-100 last:border-0">
                                        <div className="flex items-center mb-2 text-gray-700">
                                            <h3 className="font-medium">{p.shopName}</h3>
                                        </div>
                                        
                                        {p.products.map((pt, j) => (
                                            <div key={j} className="flex flex-col md:flex-row gap-4 py-3">
                                                <div className="flex gap-4 flex-1">
                                                    <img 
                                                        className="w-20 h-20 object-cover rounded" 
                                                        src={pt.productInfo.images[0]} 
                                                        alt={pt.productInfo.name} 
                                                    />
                                                    <div>
                                                        <h4 className="font-medium">{pt.productInfo.name}</h4>
                                                        <p className="text-sm text-gray-600">{pt.productInfo.brand}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex justify-between items-center md:w-40">
                                                    <div className="flex items-center bg-gray-100 rounded">
                                                        <button 
                                                            onClick={() => dec(pt.quantity, pt._id)} 
                                                            className="px-3 py-1 text-gray-700 hover:bg-gray-200"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 py-1">{pt.quantity}</span>
                                                        <button 
                                                            onClick={() => inc(pt.quantity, pt.productInfo.stock, pt._id)} 
                                                            className="px-3 py-1 text-gray-700 hover:bg-gray-200"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    
                                                    <button 
                                                        onClick={() => dispatch(delete_card_product(pt._id))} 
                                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {outofstock_products && outofstock_products.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="p-4 border-b border-gray-100">
                                    <h2 className="text-lg font-medium text-red-600">
                                        No disponibles ({outofstock_products.length})
                                    </h2>
                                </div>
                                
                                {outofstock_products.map((p, i) => (
                                    <div key={i} className="p-4 border-b border-gray-100 last:border-0">
                                        {/* Implementar según sea necesario */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="lg:col-span-1">
                        {card_products.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                                <h2 className="text-lg font-medium mb-4">Resumen del intercambio</h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span>{buy_product_item} servicios</span>
                                        <span>{price} horas</span>
                                    </div>
                                    {shipping_fee > 0 && (
                                        <div className="flex justify-between">
                                            <span>Tarifa adicional</span>
                                            <span>{shipping_fee} horas</span>
                                        </div>
                                    )}
                                    <div className="pt-3 border-t border-gray-100 flex justify-between font-medium text-green-600">
                                        <span>Total</span>
                                        <span>{price + shipping_fee} horas</span>
                                    </div>
                                </div>
                                
                                <Button
                                    variant="primary"
                                    onClick={redirect}
                                    className="w-full py-3"
                                >
                                    Confirmar intercambio ({buy_product_item})
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <FaExchangeAlt className="text-amber-500 text-5xl mx-auto mb-4" />
                    <h2 className="text-xl font-medium mb-4">No tienes servicios para intercambiar</h2>
                    <p className="text-gray-600 mb-6">
                        Explora nuestra plataforma para encontrar servicios que puedas intercambiar.
                    </p>
                    <Button 
                        as={Link} 
                        to="/shops" 
                        variant="primary"
                        className="px-6 py-2"
                    >
                        Explorar servicios
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Card;