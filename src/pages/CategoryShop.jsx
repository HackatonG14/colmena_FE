import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Range } from 'react-range';
import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';
import Products from '../components/products/Products';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/ui/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { price_range_product, query_products } from '../store/reducers/homeReducer';

const CategoryShop = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');

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
    const [sortPrice, setSortPrice] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(
            query_products({
                low: state.values[0] || '',
                high: state.values[1] || '',
                category,
                rating,
                sortPrice,
                pageNumber
            })
        );
    }, [state.values[0], state.values[1], category, rating, sortPrice, pageNumber]);

    const resetRating = () => {
        setRating('');
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                rating: '',
                sortPrice,
                pageNumber
            })
        );
    };

    const resetFilters = () => {
        setRating('');
        setState({ values: [priceRange.low, priceRange.high] });
        setSortPrice('');
        setPageNumber(1);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header section */}
            <section className="py-12 bg-gradient-to-b from-amber-50/50 to-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-light text-gray-900">
                            {category ? (
                                <>Servicios de <span className="text-amber-500 font-medium">{category}</span></>
                            ) : (
                                <>Explorar <span className="text-amber-500 font-medium">Servicios</span></>
                            )}
                        </h1>
                        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                            Descubre servicios disponibles para intercambio en nuestra comunidad
                        </p>
                        <div className="mt-4 flex justify-center text-sm">
                            <Link
                                to="/"
                                className="text-amber-500 hover:text-amber-600 transition-colors mr-2"
                            >
                                Inicio
                            </Link>
                            <span className="text-gray-400 mx-2">/</span>
                            <Link
                                to="/categories"
                                className="text-amber-500 hover:text-amber-600 transition-colors mr-2"
                            >
                                Categorías
                            </Link>
                            {category && (
                                <>
                                    <span className="text-gray-400 mx-2">/</span>
                                    <span className="text-gray-700">{category}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Search bar */}
                    <div className="max-w-2xl mx-auto mt-8">
                        <div className="relative">
                            <input
                                type="search"
                                placeholder="Buscar servicios..."
                                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FiSearch />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap gap-6">
                        {/* Filter toggle for mobile */}
                        <div className="w-full md:hidden mb-4">
                            <button 
                                onClick={() => setFilter(!filter)} 
                                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <FiFilter className="text-amber-500" />
                                <span>{filter ? 'Ocultar filtros' : 'Mostrar filtros'}</span>
                            </button>
                        </div>

                        {/* Sidebar filters */}
                        <div className={`w-full md:w-3/12 md:pr-0 ${filter ? 'block' : 'hidden md:block'}`}>
                            <div className="bg-white rounded-3xl shadow-sm p-6 mb-6 border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-medium text-gray-900">Filtros</h2>
                                    <button 
                                        onClick={resetFilters}
                                        className="text-sm text-amber-500 hover:text-amber-600 transition-colors"
                                    >
                                        Limpiar todo
                                    </button>
                                </div>

                                {/* Price Range */}
                                <div className="py-4 border-b border-gray-100">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Horas requeridas</h3>
                                    <Range
                                        step={1}
                                        min={priceRange.low}
                                        max={priceRange.high}
                                        values={(state.values)}
                                        onChange={(values) => setState({ values })}
                                        renderTrack={({ props, children }) => (
                                            <div {...props} className='w-full h-[6px] bg-gray-200 rounded-full cursor-pointer'>
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div className='w-[18px] h-[18px] bg-amber-500 rounded-full shadow-md' {...props} />
                                        )}
                                    />
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="bg-gray-100 px-3 py-1 rounded-lg text-gray-800">
                                            {Math.floor(state.values[0])} h
                                        </span>
                                        <span className="bg-gray-100 px-3 py-1 rounded-lg text-gray-800">
                                            {Math.floor(state.values[1])} h
                                        </span>
                                    </div>
                                </div>

                                {/* Rating Filter */}
                                <div className="py-4">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Valoración</h3>
                                    <div className='flex flex-col gap-3'>
                                        <div 
                                            onClick={() => setRating(5)} 
                                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${rating === 5 ? 'bg-amber-50 text-amber-500' : 'text-orange-400 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex">
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </div>
                                            <span className="text-sm text-gray-700">5 estrellas</span>
                                        </div>

                                        <div 
                                            onClick={() => setRating(4)} 
                                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${rating === 4 ? 'bg-amber-50 text-amber-500' : 'text-orange-400 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex">
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <CiStar />
                                            </div>
                                            <span className="text-sm text-gray-700">4 estrellas y más</span>
                                        </div>

                                        <div 
                                            onClick={() => setRating(3)} 
                                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${rating === 3 ? 'bg-amber-50 text-amber-500' : 'text-orange-400 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex">
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <CiStar />
                                                <CiStar />
                                            </div>
                                            <span className="text-sm text-gray-700">3 estrellas y más</span>
                                        </div>

                                        <div 
                                            onClick={() => setRating(2)} 
                                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${rating === 2 ? 'bg-amber-50 text-amber-500' : 'text-orange-400 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex">
                                                <AiFillStar />
                                                <AiFillStar />
                                                <CiStar />
                                                <CiStar />
                                                <CiStar />
                                            </div>
                                            <span className="text-sm text-gray-700">2 estrellas y más</span>
                                        </div>

                                        <div 
                                            onClick={() => setRating(1)} 
                                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${rating === 1 ? 'bg-amber-50 text-amber-500' : 'text-orange-400 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex">
                                                <AiFillStar />
                                                <CiStar />
                                                <CiStar />
                                                <CiStar />
                                                <CiStar />
                                            </div>
                                            <span className="text-sm text-gray-700">1 estrella y más</span>
                                        </div>

                                        <div 
                                            onClick={resetRating} 
                                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${rating === '' ? 'bg-amber-50 text-amber-500' : 'text-gray-400 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex">
                                                <CiStar />
                                                <CiStar />
                                                <CiStar />
                                                <CiStar />
                                                <CiStar />
                                            </div>
                                            <span className="text-sm text-gray-700">Mostrar todo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Latest products panel */}
                            <div className="bg-white rounded-3xl shadow-sm p-6 hidden md:block border border-gray-100">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Servicios recientes</h3>
                                <div className="divide-y divide-gray-100">
                                    {latest_product && latest_product.slice(0, 3).map((product, index) => (
                                        <div key={index} className="py-3">
                                            <Link to={`/product/details/${product.slug}`} className="flex items-center gap-3 group">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden">
                                                    <img 
                                                        src={product.images?.[0]} 
                                                        alt={product.name} 
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-amber-500 transition-colors">{product.name}</h4>
                                                    <div className="flex text-amber-500 text-xs mt-1">
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <AiFillStar />
                                                        <CiStar />
                                                    </div>
                                                    <p className="text-sm font-medium text-amber-500 mt-1">{product.hoursRequired || product.price} horas</p>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="w-full md:w-9/12 md:pl-0">
                            <div className="bg-white rounded-3xl shadow-sm p-6 mb-6 border border-gray-100">
                                <div className="flex flex-wrap justify-between items-center">
                                    <h2 className="text-lg font-medium text-gray-800 mb-3 md:mb-0">
                                        {totalProduct} {totalProduct === 1 ? 'servicio' : 'servicios'} encontrados
                                    </h2>
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <select 
                                            onChange={(e) => setSortPrice(e.target.value)} 
                                            className="p-2 rounded-lg border border-gray-200 outline-none text-gray-700 font-medium text-sm flex-1 md:flex-none bg-gray-50/50"
                                        >
                                            <option value="">Ordenar por</option>
                                            <option value="low-to-high">Horas: menor a mayor</option>
                                            <option value="high-to-low">Horas: mayor a menor</option>
                                        </select>
                                        <div className="flex items-center gap-2 bg-gray-50/50 border border-gray-200 rounded-lg p-1 hidden md:flex">
                                            <button 
                                                onClick={() => setStyles('grid')} 
                                                className={`p-2 rounded ${styles === 'grid' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                                            >
                                                <BsFillGridFill size={14} />
                                            </button>
                                            <button 
                                                onClick={() => setStyles('list')} 
                                                className={`p-2 rounded ${styles === 'list' ? 'bg-amber-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                                            >
                                                <FaThList size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products display */}
                            <div className="mb-8">
                                {products && products.length > 0 ? (
                                    <ShopProducts products={products} styles={styles} />
                                ) : (
                                    <div className="bg-white rounded-3xl shadow-sm p-12 text-center border border-gray-100">
                                        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-amber-100 text-amber-500 mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-medium text-gray-900 mb-2">No se encontraron servicios</h2>
                                        <p className="text-gray-600 max-w-md mx-auto mb-6">
                                            No hay servicios disponibles que coincidan con tus criterios de búsqueda.
                                        </p>
                                        <button 
                                            onClick={resetFilters}
                                            className="px-5 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors shadow-sm"
                                        >
                                            Limpiar filtros
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {totalProduct > parPage && (
                                <div className="flex justify-center">
                                    <Pagination 
                                        pageNumber={pageNumber} 
                                        setPageNumber={setPageNumber} 
                                        totalItem={totalProduct} 
                                        parPage={parPage} 
                                        showItem={Math.floor(totalProduct / parPage)} 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CategoryShop;