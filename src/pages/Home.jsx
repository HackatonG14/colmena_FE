import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_products, get_category } from '../store/reducers/homeReducer';
import { FaHandshake, FaSearch, FaExchangeAlt, FaUserFriends } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';

// Datos de ejemplo para pruebas - servicios de intercambio para Colmena
const mockServices = [
  {
    _id: '1',
    name: 'Servicio de Diseño Web',
    slug: 'servicio-diseno-web',
    price: 0,
    exchangeFor: 'Clases de cocina, reparaciones del hogar, asesoría legal',
    hoursRequired: 20,
    image: 'https://via.placeholder.com/500x300/e9c46a/ffffff?text=Diseño+Web',
    rating: 4.5,
  },
  {
    _id: '2',
    name: 'Clases de Idiomas (Inglés)',
    slug: 'clases-idiomas',
    price: 0,
    exchangeFor: 'Diseño gráfico, reparación de electrónicos, clases de música',
    hoursRequired: 10,
    image: 'https://via.placeholder.com/500x300/2a9d8f/ffffff?text=Clases+de+Idiomas',
    rating: 5,
  },
  {
    _id: '3',
    name: 'Reparación de Electrónicos',
    slug: 'reparacion-electronicos',
    price: 0,
    exchangeFor: 'Clases de idiomas, jardinería, asistencia administrativa',
    hoursRequired: 5,
    image: 'https://via.placeholder.com/500x300/e76f51/ffffff?text=Reparación+Electrónicos',
    rating: 4,
  },
  {
    _id: '4',
    name: 'Asesoría Legal',
    slug: 'asesoria-legal',
    price: 0,
    exchangeFor: 'Clases de yoga, diseño gráfico, servicios de traducción',
    hoursRequired: 3,
    image: 'https://via.placeholder.com/500x300/264653/ffffff?text=Asesoría+Legal',
    rating: 4.8,
  }
];

// Testimonios de ejemplo
const testimonials = [
  {
    id: 1,
    name: 'Laura Martínez',
    avatar: 'https://via.placeholder.com/100/e9c46a/ffffff?text=LM',
    service: 'Clases de cocina',
    text: 'Intercambié mis clases de cocina por ayuda con mi sitio web. ¡La experiencia fue increíble! La plataforma Colmena hizo todo el proceso muy sencillo.',
    rating: 5
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    avatar: 'https://via.placeholder.com/100/2a9d8f/ffffff?text=CR',
    service: 'Reparación de bicicletas',
    text: 'Ofrecí mis servicios de reparación de bicicletas y a cambio recibí asesoría legal que necesitaba urgentemente. Colmena me permitió acceder a servicios que normalmente no podría pagar.',
    rating: 5
  }
];

// Categorías principales
const mainCategories = [
  { id: 1, name: 'Enseñanza', icon: '🎓', color: 'bg-amber-50 text-amber-900' },
  { id: 2, name: 'Tecnología', icon: '💻', color: 'bg-amber-50 text-amber-900' },
  { id: 3, name: 'Hogar', icon: '🏠', color: 'bg-amber-50 text-amber-900' },
  { id: 4, name: 'Salud', icon: '⚕️', color: 'bg-amber-50 text-amber-900' },
  { id: 5, name: 'Artes', icon: '🎨', color: 'bg-amber-50 text-amber-900' },
  { id: 6, name: 'Legal', icon: '⚖️', color: 'bg-amber-50 text-amber-900' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { products: storeServices, categorys, loader, errorMessage } = useSelector(state => state.home);
  
  const [localServices] = useState({
    products: mockServices
  });

  // Usa servicios de la tienda si están disponibles, si no usa los locales
  const services = storeServices?.length > 0 ? storeServices : localServices.products;
  // Asegurarse de que categorys es un array antes de intentar usar .length
  const displayCategories = Array.isArray(categorys) && categorys.length > 0 ? categorys : mainCategories;
  
  useEffect(() => {
    dispatch(get_products());
    dispatch(get_category());
  }, [dispatch]);

  // Función para truncar texto
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mostrar mensajes de error si existen */}
      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Hero Section - Minimalista */}
      <section className="relative bg-amber-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
                Intercambia <span className="text-amber-500 font-medium">habilidades</span> y <span className="text-amber-500 font-medium">servicios</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Conectamos personas que valoran más el intercambio que el dinero. Forma parte de una comunidad colaborativa.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary"
                  className="min-w-[160px] py-3 px-6 rounded-full text-white bg-amber-500 hover:bg-amber-600 transition-colors"
                >
                  Unirse ahora
                </Button>
                <Button 
                  as={Link} 
                  to="/shops" 
                  variant="outline" 
                  className="min-w-[160px] py-3 px-6 rounded-full border-amber-500 text-amber-600 hover:bg-amber-50"
                >
                  Explorar
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src="https://via.placeholder.com/800x500/e9c46a/ffffff?text=Intercambio+de+Servicios" 
                  alt="Personas intercambiando servicios" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-400 rounded-full z-0 opacity-50"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-300 rounded-full z-0 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías - Diseño Minimalista */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Explora por <span className="text-amber-500 font-medium">categorías</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre servicios clasificados por áreas de especialidad y encuentra exactamente lo que necesitas
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {displayCategories.map((category) => (
              <Link 
                key={category.id || category._id} 
                to={`/products?category=${category.slug || category.name}`}
                className="group"
              >
                <div className="bg-amber-50 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-md group-hover:bg-amber-100">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Servicios <span className="text-amber-500 font-medium">destacados</span></h2>
              <p className="text-gray-600 max-w-2xl">
                Los servicios más populares y mejor valorados por nuestra comunidad
              </p>
            </div>
            <Link to="/shops" className="mt-4 md:mt-0 text-amber-600 hover:text-amber-700 font-medium inline-flex items-center group">
              Ver todos
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link 
                key={service._id} 
                to={`/product/details/${service.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Rating value={service.rating} size="sm" />
                    <span className="text-gray-500 text-sm ml-2">{service.rating}</span>
                  </div>
                  <h3 className="font-medium text-lg text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {truncateText(service.exchangeFor, 70)}
                  </p>
                  <div className="flex items-center text-amber-600 font-medium">
                    <FaExchangeAlt className="mr-2" />
                    <span>{service.hoursRequired} horas</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Cómo <span className="text-amber-500 font-medium">funciona</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un proceso simple para conectar y comenzar a intercambiar servicios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mx-auto mb-6">
                <FaSearch className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Encuentra</h3>
              <p className="text-gray-600">
                Explora servicios ofrecidos por otros miembros de la comunidad que se ajusten a tus necesidades.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mx-auto mb-6">
                <FaHandshake className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Conecta</h3>
              <p className="text-gray-600">
                Comunícate directamente con otros usuarios y acuerda los términos del intercambio de servicios.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mx-auto mb-6">
                <FaExchangeAlt className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Intercambia</h3>
              <p className="text-gray-600">
                Realiza el intercambio de servicios y deja tu valoración para construir una comunidad de confianza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios - Diseño minimalista */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Lo que dice nuestra <span className="text-amber-500 font-medium">comunidad</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experiencias reales de personas que han usado Colmena para intercambiar servicios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-amber-600 text-sm">{testimonial.service}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <Rating value={testimonial.rating} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Unirse a la comunidad */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Forma parte de nuestra <span className="text-amber-500 font-medium">comunidad</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de personas que ya están intercambiando servicios, construyendo relaciones y fortaleciendo la economía colaborativa.
          </p>
          <Button 
            as={Link} 
            to="/register" 
            variant="primary"
            className="min-w-[200px] py-4 px-8 text-lg rounded-full bg-amber-500 hover:bg-amber-600 transition-colors"
          >
            Comenzar ahora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;