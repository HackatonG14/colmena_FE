import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { get_banners } from '../../store/reducers/homeReducer';
import { FaExchangeAlt, FaArrowRight } from 'react-icons/fa';

// Banner personalizado con diseño minimalista para Colmena
const CustomBanner = ({ image, title, description, buttonText, link }) => {
    return (
        <div className="relative w-full h-[450px] overflow-hidden bg-gray-100">
            {/* Overlay de colores degradados */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-600/20 z-10"></div>

            {/* Imagen de fondo con efecto sutil */}
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center opacity-60"
            />

            {/* Contenido centrado y simple */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-8 md:px-20 lg:px-24 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {title}
                </h2>
                <p className="text-base md:text-lg text-gray-800 mb-8 max-w-xl">
                    {description}
                </p>
                <Link
                    to={link}
                    className="group flex items-center gap-2 bg-amber-500 hover:bg-amber-600 transition-all text-white py-3 px-8 rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                    {buttonText}
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Elemento decorativo - patrón de hexágonos para tema colmena */}
            <div className="absolute top-0 right-0 w-1/4 h-full opacity-10 z-0">
                <svg viewBox="0 0 100 100" className="h-full">
                    <pattern id="hexagons" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path d="M5,0 L10,2.5 L10,7.5 L5,10 L0,7.5 L0,2.5 Z" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hexagons)" />
                </svg>
            </div>
        </div>
    );
};

// Banners mejorados con mensajes claros sobre Colmena
const mockBanners = [
    {
        _id: '1',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        title: 'Intercambia habilidades sin usar dinero',
        description: 'En Colmena, tu tiempo y habilidades son el valor real. Conéctate con personas que ofrecen lo que necesitas y ofrece lo que sabes hacer.',
        buttonText: 'Descubre servicios',
        link: '/shops'
    },
    {
        _id: '2',
        image: 'https://images.unsplash.com/photo-1577562180929-5b8a2f64168d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        title: 'Construye comunidad, no transacciones',
        description: 'Somos una red de personas que se apoyan mutuamente para crear una economía colaborativa basada en la confianza y reciprocidad.',
        buttonText: 'Únete a Colmena',
        link: '/login'
    },
    {
        _id: '3',
        image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        title: 'Tu tiempo vale, compártelo',
        description: 'Cada habilidad que ofreces puede transformarse en servicios que necesitas. En Colmena, el intercambio justo beneficia a todos.',
        buttonText: 'Cómo funciona',
        link: '/about'
    }
];

const Banner = () => {
    const dispatch = useDispatch();
    const { banners: storeBanners } = useSelector(state => state.home);
    const [localBanners] = useState(mockBanners);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        },
    }

    useEffect(() => {
        try {
            dispatch(get_banners());
        } catch (error) {
            console.log('Error fetching banners, using mock data', error);
        }
    }, [dispatch]);

    // Usar banners del store si existen, de lo contrario usar banners locales
    const displayBanners = storeBanners?.length > 0 ? storeBanners : localBanners;

    return (
        <div className='w-full relative'>
            <Carousel
                autoPlay={true}
                infinite={true}
                arrows={false}
                showDots={true}
                responsive={responsive}
                autoPlaySpeed={7000}
                dotListClass="custom-dot-list-style custom-dots"
                renderDotsOutside={false}
                className="banner-carousel"
            >
                {
                    displayBanners.map((b, i) => (
                        <CustomBanner
                            key={i}
                            image={b.image || b.banner}
                            title={b.title}
                            description={b.description}
                            buttonText={b.buttonText}
                            link={b.link}
                        />
                    ))
                }
            </Carousel>

            {/* Transición visual para conectar con la siguiente sección */}
            <div className="w-full h-16 bg-gradient-to-b from-gray-100/50 to-white -mt-16 relative z-10"></div>

            {/* Estilo adicional para los dots del carousel */}
            <style jsx>{`
                .custom-dots {
                    bottom: 20px !important;
                }
                .custom-dots li button {
                    background: rgba(255, 255, 255, 0.5) !important;
                    width: 8px !important;
                    height: 8px !important;
                    border-radius: 50% !important;
                    margin: 0 4px !important;
                }
                .custom-dots li.react-multi-carousel-dot--active button {
                    background: #f59e0b !important;
                }
            `}</style>
        </div>
    );
};

export default Banner;