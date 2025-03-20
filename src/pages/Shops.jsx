import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaSearch } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList, FaFilter, FaExchangeAlt, FaSlidersH } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/ui/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { price_range_product, query_products } from '../store/reducers/homeReducer';

const Shops = () => {
    const dispatch = useDispatch();
    const { products, categorys, priceRange, latest_product, totalProduct, parPage } = useSelector(state => state.home);

    useEffect(() => { 
        dispatch(price_range_product());
    }, []);
    
    useEffect(() => { 
        setState({
            values: [priceRange.low, priceRange.high]
        });
    }, [priceRange]);

    const [filter, setFilter] = useState(false);
    const [state, setState] = useState({ values: [priceRange.low, priceRange.high] });
    const [rating, setRating] = useState('');
    const [styles, setStyles] = useState('grid');
    const [pageNumber, setPageNumber] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [category, setCategory] = useState('');
    const [exchangeOnly, setExchangeOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const queryCategory = (e, value) => {
        if (e.target.checked) {
            setCategory(value);
        } else {
            setCategory('');
        }
    };

    useEffect(() => { 
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                rating,
                sortPrice: sortBy,
                pageNumber,
                exchangeOnly
            })
        );
    }, [state.values[0], state.values[1], category, rating, sortBy, pageNumber, exchangeOnly]);

    const resetFilters = () => {
        setRating('');
        setCategory('');
        setExchangeOnly(false);
        setSortBy('');
        setState({ values: [priceRange.low, priceRange.high] });
        dispatch(
            query_products({
                low: priceRange.low,
                high: priceRange.high,
                category: '',
                rating: '',
                sortPrice: '',
                pageNumber: 1,
                exchangeOnly: false
            })
        );
    };

    return (
        <div className="min-h-screen bg-amber-50/30">
            {/* Banner más ligero */}
            <section className="py-12 bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-light text-gray-900">
                            Servicios <span className="text-amber-500 font-medium">disponibles</span>
                        </h1>
                        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                            Explora nuestro catálogo de servicios para intercambio y encuentra lo que necesitas
                        </p>
                        <div className="mt-4 flex justify-center text-sm">
                            <Link 
                                to="/" 
                                className="text-amber-500 hover:text-amber-600 transition-colors mr-2"
                            >
                                Inicio
                            </Link>
                            <span className="text-gray-400 mx-2">/</span>
                            <span className="text-gray-700">Servicios</span>
                        </div>
                    </div>
                    
                    {/* Barra de búsqueda */}
                    <div className="max-w-2xl mx-auto mt-8">
                        <div className="relative">
                            <input
                                type="search"
                                placeholder="Buscar servicios..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FaSearch />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="flex flex-wrap -mx-4">
                    {/* Filtro móvil y opciones */}
                    <div className="w-full px-4 mb-6 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={() => setFilter(!filter)}
                                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 md:hidden"
                            >
                                {filter ? <FiX className="text-gray-500" /> : <FaSlidersH className="text-gray-500" />}
                                <span>{filter ? 'Cerrar' : 'Filtros'}</span>
                            </button>
                            
                            <div className="hidden md:flex items-center space-x-3">
                                <button 
                                    onClick={() => setStyles('grid')}
                                    className={`p-2 rounded-lg ${styles === 'grid' ? 'bg-amber-100 text-amber-600' : 'bg-white text-gray-500'}`}
                                >
                                    <BsFillGridFill />
                                </button>
                                <button 
                                    onClick={() => setStyles('list')}
                                    className={`p-2 rounded-lg ${styles === 'list' ? 'bg-amber-100 text-amber-600' : 'bg-white text-gray-500'}`}
                                >
                                    <FaThList />
                                </button>
                            </div>
                        </div>
                        
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-xl border border-gray-200 py-2 px-3 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-700 text-sm"
                        >
                            <option value="">Ordenar por</option>
                            <option value="low-to-high">Tiempo: menor a mayor</option>
                            <option value="high-to-low">Tiempo: mayor a menor</option>
                        </select>
                    </div>
                    
                    {/* Contenedor principal con filtros y productos */}
                    <div className="flex flex-wrap">
                        {/* Barra lateral de filtros */}
                        <div className={`w-full md:w-1/4 px-4 ${filter ? 'block' : 'hidden'} md:block`}>
                            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                <div className="flex justify-between items-center mb-5">
                                    <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                                    <button 
                                        onClick={resetFilters}
                                        className="text-sm text-amber-500 hover:text-amber-600"
                                    >
                                        Limpiar todo
                                    </button>
                                </div>
                                
                                {/* Categorías */}
                                <div className="mb-6">
                                    <h3 className="text-gray-800 font-medium mb-3 text-sm">Categorías</h3>
                                    <div className="space-y-2">
                                        {categorys?.map((c, i) => (
                                            <div key={i} className="flex items-center">
                                                <input 
                                                    checked={category === c.name}
                                                    onChange={(e) => queryCategory(e, c.name)}
                                                    type="checkbox"
                                                    id={c.name}
                                                    className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                                                />
                                                <label htmlFor={c.name} className="ml-2 text-sm text-gray-600 cursor-pointer hover:text-amber-500 transition-colors">
                                                    {c.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Valoraciones */}
                                <div className="mb-6">
                                    <h3 className="text-gray-800 font-medium mb-3 text-sm">Valoraciones</h3>
                                    <div className="space-y-2">
                                        {[5, 4, 3, 2, 1].map(star => (
                                            <div
                                                key={star}
                                                onClick={() => {
                                                    setRating(star);
                                                    dispatch(
                                                        query_products({
                                                            low: state.values[0],
                                                            high: state.values[1],
                                                            category,
                                                            rating: star,
                                                            sortPrice: sortBy,
                                                            pageNumber,
                                                            exchangeOnly
                                                        })
                                                    );
                                                }}
                                                className={`flex items-center gap-2 cursor-pointer group p-1 rounded ${rating === star ? 'bg-amber-50' : ''}`}
                                            >
                                                <div className="flex text-amber-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        i < star ? 
                                                            <FaStar key={i} /> : 
                                                            <FaRegStar key={i} />
                                                    ))}
                                                </div>
                                                <span className={`text-sm ${rating === star ? 'text-amber-600' : 'text-gray-500'} group-hover:text-amber-500 transition-colors`}>
                                                    ({star})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Solo intercambios */}
                                <div className="mb-6">
                                    <div className="flex items-center">
                                        <input 
                                            checked={exchangeOnly}
                                            onChange={(e) => setExchangeOnly(e.target.checked)}
                                            type="checkbox"
                                            id="exchange-only"
                                            className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                                        />
                                        <label htmlFor="exchange-only" className="ml-2 text-sm text-gray-600">
                                            Solo servicios de intercambio
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Productos */}
                        <div className="w-full md:w-3/4 px-4">
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <ShopProducts products={products} styles={styles} />
                                
                                {/* Paginación */}
                                {products.length > 0 && (
                                    <div className="mt-8">
                                        <Pagination
                                            pageNumber={pageNumber}
                                            setPageNumber={setPageNumber}
                                            totalItem={totalProduct}
                                            parPage={parPage}
                                            showItem={5}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shops;