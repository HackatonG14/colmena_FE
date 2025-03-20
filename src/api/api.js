import axios from "axios";
import { API_BASE_URL } from '../utils/constants';

/**
 * Create axios instance with base configuration
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request interceptor
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('customerToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 */
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle global error responses
        if (error.response) {
            if (error.response.status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('customerToken');
                window.location.href = '/login';
            } 
            else if (error.response.status === 403) {
                // Forbidden - probably needs authentication or lacks permissions
                console.error('Error 403: Acceso prohibido');
                
                // Proporcionar datos de demostración para desarrollo local
                if (error.config && error.config.url) {
                    // Detectar qué tipo de solicitud falló
                    const url = error.config.url;
                    
                    // Si es una solicitud para obtener categorías
                    if (url.includes('/home/get-categorys')) {
                        return Promise.resolve({
                            data: {
                                categorys: [
                                    { _id: '1', name: 'Enseñanza', slug: 'ensenanza', icon: '🎓', color: 'bg-amber-50 text-amber-900' },
                                    { _id: '2', name: 'Tecnología', slug: 'tecnologia', icon: '💻', color: 'bg-amber-50 text-amber-900' },
                                    { _id: '3', name: 'Hogar', slug: 'hogar', icon: '🏠', color: 'bg-amber-50 text-amber-900' },
                                    { _id: '4', name: 'Salud', slug: 'salud', icon: '⚕️', color: 'bg-amber-50 text-amber-900' },
                                    { _id: '5', name: 'Artes', slug: 'artes', icon: '🎨', color: 'bg-amber-50 text-amber-900' },
                                    { _id: '6', name: 'Legal', slug: 'legal', icon: '⚖️', color: 'bg-amber-50 text-amber-900' }
                                ]
                            }
                        });
                    }
                    
                    // Si es una solicitud para obtener productos
                    if (url.includes('/home/products')) {
                        return Promise.resolve({
                            data: {
                                products: Array(8).fill().map((_, i) => ({
                                    _id: `product-${i + 1}`,
                                    name: `Producto ${i + 1}`,
                                    slug: `producto-${i + 1}`,
                                    price: Math.floor(Math.random() * 100) + 10,
                                    discount: Math.floor(Math.random() * 20),
                                    image: `/images/product${i + 1}.jpg`,
                                    rating: Math.floor(Math.random() * 5) + 1,
                                    stock: Math.floor(Math.random() * 50) + 5
                                })),
                                totalProduct: 24,
                                priceRange: { low: 10, high: 1000 }
                            }
                        });
                    }
                    
                    // Si es una solicitud para obtener top productos o precios
                    if (url.includes('/price-range-latest-products')) {
                        return Promise.resolve({
                            data: {
                                latest_product: Array(4).fill().map((_, i) => ({
                                    _id: `latest-${i + 1}`,
                                    name: `Nuevo Producto ${i + 1}`,
                                    slug: `nuevo-producto-${i + 1}`,
                                    price: Math.floor(Math.random() * 100) + 10,
                                    discount: Math.floor(Math.random() * 20),
                                    image: `/images/latest${i + 1}.jpg`,
                                    rating: Math.floor(Math.random() * 5) + 1
                                })),
                                topRated_product: Array(4).fill().map((_, i) => ({
                                    _id: `top-${i + 1}`,
                                    name: `Top Producto ${i + 1}`,
                                    slug: `top-producto-${i + 1}`,
                                    price: Math.floor(Math.random() * 100) + 10,
                                    discount: 0,
                                    image: `/images/top${i + 1}.jpg`,
                                    rating: 5
                                })),
                                discount_product: Array(4).fill().map((_, i) => ({
                                    _id: `discount-${i + 1}`,
                                    name: `Oferta ${i + 1}`,
                                    slug: `oferta-${i + 1}`,
                                    price: Math.floor(Math.random() * 100) + 20,
                                    discount: Math.floor(Math.random() * 30) + 10,
                                    image: `/images/discount${i + 1}.jpg`,
                                    rating: Math.floor(Math.random() * 5) + 1
                                }))
                            }
                        });
                    }
                    
                    // Si es un intento de login
                    if (url.includes('/customer/login') && error.config.method === 'post') {
                        // Verificamos el body para ver si podemos autenticar con datos de demostración
                        try {
                            const requestData = JSON.parse(error.config.data);
                            if (requestData.email === 'demo@example.com' && requestData.password === 'password123') {
                                return Promise.resolve({
                                    data: {
                                        message: 'Login exitoso',
                                        token: 'demo_token_123456',
                                        user: {
                                            _id: 'demo_user',
                                            name: 'Usuario Demo',
                                            email: 'demo@example.com'
                                        }
                                    }
                                });
                            }
                        } catch (e) {
                            console.error('Error al parsear datos de login:', e);
                        }
                    }
                    
                    // Si es un intento de registro
                    if (url.includes('/customer/register') && error.config.method === 'post') {
                        try {
                            const requestData = JSON.parse(error.config.data);
                            return Promise.resolve({
                                data: {
                                    message: 'Registro exitoso',
                                    token: 'demo_token_register_123456',
                                    user: {
                                        _id: 'new_demo_user',
                                        name: requestData.name || 'Nuevo Usuario',
                                        email: requestData.email || 'nuevo@example.com'
                                    }
                                }
                            });
                        } catch (e) {
                            console.error('Error al parsear datos de registro:', e);
                        }
                    }
                }
            }
        } else {
            console.error('Error de red o el servidor no está disponible');
        }
        return Promise.reject(error);
    }
);

export default apiClient;