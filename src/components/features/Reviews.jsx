import React, { useEffect, useState } from 'react';
import Rating from '../ui/Rating';
import Pagination from '../ui/Pagination';
import { Link } from 'react-router-dom';
import RatingReact from 'react-rating'
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { customer_review, get_reviews, messageClear, product_details } from "../../store/reducers/homeReducer";
import toast from 'react-hot-toast';

const Reviews = ({product, reviews: propReviews}) => {
    const dispatch = useDispatch();
    const [parPage, setParPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    
    const {userInfo} = useSelector(state => state.auth);
    const {successMessage, reviews, rating_review, totalReview} = useSelector(state => state.home);

    const [rat, setRat] = useState('');
    const [re, setRe] = useState('');

    const review_submit = (e) => {
        e.preventDefault();
        if (!rat) {
            toast.error('Por favor, selecciona una valoración');
            return;
        }

        const obj = {
            name: userInfo.name,
            review: re,
            rating: rat,
            productId: product._id
        }
        dispatch(customer_review(obj));
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage); 
            dispatch(get_reviews({
                productId: product._id,
                pageNumber
            }));
            dispatch(product_details(product.slug));
            setRat('');
            setRe('');
            dispatch(messageClear());
        }  
    }, [successMessage]);

    useEffect(() => {
        if (product._id) {
            dispatch(get_reviews({
                productId: product._id,
                pageNumber
            }));
        }
    }, [pageNumber, product]);

    // Usar las reseñas proporcionadas como prop si están disponibles, 
    // de lo contrario usar las reseñas del estado de Redux
    const displayReviews = propReviews || reviews || [];
    const reviewCount = totalReview || (displayReviews?.length || 0);

    return (
        <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Resumen de valoraciones */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex flex-col justify-start items-center text-center mb-4">
                        <div className="mb-2">
                            <span className="text-5xl font-bold text-gray-800">{product.rating || 0}</span>
                            <span className="text-2xl font-medium text-gray-500">/5</span>
                        </div>
                        <div className="flex text-2xl mb-1">
                            <Rating ratings={product.rating || 0} />
                        </div>
                        <p className="text-sm text-gray-500">Basado en {reviewCount} valoraciones</p>
                    </div>

                    <div className="space-y-3 mt-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                                <Rating ratings={5} integer={true} />
                            </div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    style={{ width: `${Math.floor((100 * (rating_review?.[0]?.sum || 0)) / (totalReview || 1))}%` }} 
                                    className="h-full bg-amber-500"
                                ></div> 
                            </div>
                            <span className="text-sm text-gray-600 w-6 text-right">{rating_review?.[0]?.sum || 0}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                                <Rating ratings={4} integer={true} />
                            </div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    style={{ width: `${Math.floor((100 * (rating_review?.[1]?.sum || 0)) / (totalReview || 1))}%` }} 
                                    className="h-full bg-amber-500"
                                ></div> 
                            </div>
                            <span className="text-sm text-gray-600 w-6 text-right">{rating_review?.[1]?.sum || 0}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                                <Rating ratings={3} integer={true} />
                            </div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    style={{ width: `${Math.floor((100 * (rating_review?.[2]?.sum || 0)) / (totalReview || 1))}%` }} 
                                    className="h-full bg-amber-500"
                                ></div> 
                            </div>
                            <span className="text-sm text-gray-600 w-6 text-right">{rating_review?.[2]?.sum || 0}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                                <Rating ratings={2} integer={true} />
                            </div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    style={{ width: `${Math.floor((100 * (rating_review?.[3]?.sum || 0)) / (totalReview || 1))}%` }} 
                                    className="h-full bg-amber-500"
                                ></div> 
                            </div>
                            <span className="text-sm text-gray-600 w-6 text-right">{rating_review?.[3]?.sum || 0}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                                <Rating ratings={1} integer={true} />
                            </div>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    style={{ width: `${Math.floor((100 * (rating_review?.[4]?.sum || 0)) / (totalReview || 1))}%` }} 
                                    className="h-full bg-amber-500"
                                ></div> 
                            </div>
                            <span className="text-sm text-gray-600 w-6 text-right">{rating_review?.[4]?.sum || 0}</span>
                        </div>
                    </div>
                </div>

                {/* Nueva valoración */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">¿Utilizaste este servicio?</h3>
                    {
                        userInfo ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center mb-2">
                                    <RatingReact 
                                        onChange={(e) => setRat(e)}
                                        initialRating={rat}
                                        emptySymbol={<span className="text-gray-300 text-3xl"><CiStar/></span>}
                                        fullSymbol={<span className="text-amber-500 text-3xl"><FaStar/></span>} 
                                    /> 
                                </div> 
                                <form onSubmit={review_submit}>
                                    <textarea 
                                        value={re} 
                                        onChange={(e) => setRe(e.target.value)} 
                                        required 
                                        placeholder="Comparte tu experiencia con este servicio..."
                                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none" 
                                        rows="4"
                                    ></textarea>
                                    <div className="mt-4 flex justify-end">
                                        <button 
                                            type="submit" 
                                            className="px-6 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm"
                                        >
                                            Enviar valoración
                                        </button>
                                    </div> 
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-6 bg-gray-50/50 rounded-xl">
                                <p className="text-gray-600 mb-4 text-center">Inicia sesión para dejar tu valoración</p>
                                <Link 
                                    to="/login" 
                                    className="px-6 py-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm"
                                >
                                    Iniciar sesión
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Lista de valoraciones */}
            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-6">Valoraciones de los usuarios ({reviewCount})</h3>
                
                {displayReviews.length > 0 ? (
                    <div className="space-y-6">
                        {displayReviews.map((r, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 font-medium">
                                            {r.name ? r.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">{r.name}</p>
                                            <div className="flex gap-1">
                                                <Rating ratings={r.rating} integer={true} />
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">{r.date}</span>
                                </div>
                                <p className="text-gray-600">{r.review}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50/50 p-8 rounded-2xl text-center">
                        <p className="text-gray-500">Este servicio aún no tiene valoraciones.</p>
                        <p className="text-gray-500 mt-2">¡Sé el primero en compartir tu experiencia!</p>
                    </div>
                )}
                
                <div className="mt-6 flex justify-center">
                    {totalReview > parPage && (
                        <Pagination 
                            pageNumber={pageNumber} 
                            setPageNumber={setPageNumber} 
                            totalItem={totalReview} 
                            parPage={parPage} 
                            showItem={Math.min(5, Math.ceil(totalReview / parPage))} 
                        />
                    )}
                </div> 
            </div>
        </div>
    );
};

export default Reviews;