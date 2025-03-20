import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList, FaFilter, FaExchangeAlt } from 'react-icons/fa';
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

    const resetRating = () => {
        setRating('');
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                rating: '',
                sortPrice: sortBy,
                pageNumber,
                exchangeOnly
            })
        );
    };

    return (
        <div className='w-full'>
            {/* Banner */}
            <section className="bg-amber-50 py-16">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-light text-gray-900 mb-4">Servicios Disponibles</h1>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Explora nuestro catálogo de servicios para intercambio y encuentra lo que necesitas
                        </p>
                        <div className="mt-6 flex justify-center">
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
                </div>
            </section>

            <div className='max-w-7xl mx-auto py-16 px-4'>
                <div className='flex flex-wrap'>
                    {/* Barra lateral de filtros */}
                    <div className={`w-full lg:w-3/12 ${filter ? 'block' : 'hidden'} lg:block pr-0 lg:pr-8`}>
                        <div className='mb-10'>
                            <h2 className='text-lg font-medium text-gray-900 mb-5'>Filtros</h2>
                            
                            <div className='py-2 flex justify-end lg:hidden'>
                                <button 
                                    onClick={() => setFilter(false)}
                                    className='text-gray-600 hover:text-amber-500'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Categorías */}
                            <div className='mb-8'>
                                <h3 className='text-gray-800 font-medium mb-4'>Categorías</h3>
                                <div className='flex flex-col gap-3'>
                                    {categorys?.map((c, i) => (
                                        <div key={i} className='flex items-center gap-2'>
                                            <input 
                                                checked={category === c.name}
                                                onChange={(e) => queryCategory(e, c.name)}
                                                type="checkbox"
                                                id={c.name}
                                                className='w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500'
                                            />
                                            <label htmlFor={c.name} className='text-gray-600 cursor-pointer hover:text-amber-500 transition-colors'>{c.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Valoraciones */}
                            <div className='mb-8'>
                                <h3 className='text-gray-800 font-medium mb-4'>Valoraciones</h3>
                                <div className='flex flex-col gap-3'>
                                    <div
                                        onClick={() => {
                                            setRating(5);
                                            dispatch(
                                                query_products({
                                                    low: state.values[0],
                                                    high: state.values[1],
                                                    category,
                                                    rating: 5,
                                                    sortPrice: sortBy,
                                                    pageNumber,
                                                    exchangeOnly
                                                })
                                            );
                                        }}
                                        className='flex items-center gap-2 cursor-pointer group'
                                    >
                                        <div className='flex text-amber-400'>
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                        </div>
                                        <span className='text-gray-600 group-hover:text-amber-500 transition-colors'>(5)</span>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setRating(4);
                                            dispatch(
                                                query_products({
                                                    low: state.values[0],
                                                    high: state.values[1],
                                                    category,
                                                    rating: 4,
                                                    sortPrice: sortBy,
                                                    pageNumber,
                                                    exchangeOnly
                                                })
                                            );
                                        }}
                                        className='flex items-center gap-2 cursor-pointer group'
                                    >
                                        <div className='flex text-amber-400'>
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaRegStar />
                                        </div>
                                        <span className='text-gray-600 group-hover:text-amber-500 transition-colors'>(4)</span>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setRating(3);
                                            dispatch(
                                                query_products({
                                                    low: state.values[0],
                                                    high: state.values[1],
                                                    category,
                                                    rating: 3,
                                                    sortPrice: sortBy,
                                                    pageNumber,
                                                    exchangeOnly
                                                })
                                            );
                                        }}
                                        className='flex items-center gap-2 cursor-pointer group'
                                    >
                                        <div className='flex text-amber-400'>
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaRegStar />
                                            <FaRegStar />
                                        </div>
                                        <span className='text-gray-600 group-hover:text-amber-500 transition-colors'>(3)</span>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setRating(2);
                                            dispatch(
                                                query_products({
                                                    low: state.values[0],
                                                    high: state.values[1],
                                                    category,
                                                    rating: 2,
                                                    sortPrice: sortBy,
                                                    pageNumber,
                                                    exchangeOnly
                                                })
                                            );
                                        }}
                                        className='flex items-center gap-2 cursor-pointer group'
                                    >
                                        <div className='flex text-amber-400'>
                                            <FaStar />
                                            <FaStar />
                                            <FaRegStar />
                                            <FaRegStar />
                                            <FaRegStar />
                                        </div>
                                        <span className='text-gray-600 group-hover:text-amber-500 transition-colors'>(2)</span>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setRating(1);
                                            dispatch(
                                                query_products({
                                                    low: state.values[0],
                                                    high: state.values[1],
                                                    category,
                                                    rating: 1,
                                                    sortPrice: sortBy,
                                                    pageNumber,
                                                    exchangeOnly
                                                })
                                            );
                                        }}
                                        className='flex items-center gap-2 cursor-pointer group'
                                    >
                                        <div className='flex text-amber-400'>
                                            <FaStar />
                                            <FaRegStar />
                                            <FaRegStar />
                                            <FaRegStar />
                                            <FaRegStar />
                                        </div>
                                        <span className='text-gray-600 group-hover:text-amber-500 transition-colors'>(1)</span>
                                    </div>
                                    <div
                                        onClick={resetRating}
                                        className='text-amber-500 cursor-pointer hover:underline mt-2'
                                    >
                                        Limpiar filtros
                                    </div>
                                </div>
                            </div>
                            
                            {/* Solo intercambios */}
                            <div className='mb-8'>
                                <div className='flex items-center gap-3'>
                                    <input 
                                        checked={exchangeOnly}
                                        onChange={() => setExchangeOnly(!exchangeOnly)}
                                        type="checkbox"
                                        id="exchangeOnly"
                                        className='w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500'
                                    />
                                    <label htmlFor="exchangeOnly" className='flex items-center gap-1 text-gray-700 cursor-pointer'>
                                        <FaExchangeAlt className="text-amber-500" />
                                        <span>Solo intercambios</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Lista de productos */}
                    <div className='w-full lg:w-9/12'>
                        <div className='pl-0 lg:pl-8'>
                            {/* Filtros superior */}
                            <div className='pb-6 mb-6 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4'>
                                <div className='flex items-center gap-4'>
                                    <div className='lg:hidden'>
                                        <button 
                                            onClick={() => setFilter(!filter)}
                                            className='bg-amber-50 hover:bg-amber-100 text-amber-600 p-2 rounded-lg flex items-center gap-1 transition-colors'
                                        >
                                            <FaFilter />
                                            <span>Filtros</span>
                                        </button>
                                    </div>
                                    <p className='text-gray-600'>
                                        Mostrando {products?.length} de {totalProduct} servicios
                                    </p>
                                </div>
                                
                                <div className='flex flex-wrap items-center gap-4'>
                                    <div>
                                        <select 
                                            className='px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-amber-500 text-gray-700 bg-white'
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="">Ordenar por</option>
                                            <option value="low-to-high">Horas: menor a mayor</option>
                                            <option value="high-to-low">Horas: mayor a menor</option>
                                        </select>
                                    </div>
                                    
                                    <div className='flex items-center gap-1'>
                                        <button 
                                            onClick={() => setStyles('grid')}
                                            className={`p-2 ${styles === 'grid' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600'} rounded-md hover:bg-amber-50 hover:text-amber-500 transition-colors`}
                                        >
                                            <BsFillGridFill />
                                        </button>
                                        <button 
                                            onClick={() => setStyles('list')}
                                            className={`p-2 ${styles === 'list' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600'} rounded-md hover:bg-amber-50 hover:text-amber-500 transition-colors`}
                                        >
                                            <FaThList />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Productos */}
                            <div>
                                <ShopProducts products={products} styles={styles} />
                            </div>
                            
                            {totalProduct > parPage && (
                                <div className='py-10'>
                                    <Pagination
                                        pageNumber={pageNumber}
                                        setPageNumber={setPageNumber}
                                        totalItem={totalProduct}
                                        parPage={parPage}
                                        showItem={4}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shops;