import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

/**
 * Rating component that displays star ratings
 * @param {number} ratings - The rating value (0-5)
 * @param {boolean} integer - If true, displays whole stars only (like RatingTemp)
 */
const Rating = ({ ratings, integer = false }) => {
    // For integer ratings (similar to RatingTemp)
    if (integer) {
        const ratingValue = Math.floor(ratings);
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, index) => (
                    <span key={index} className='text-amber-500'>
                        {index < ratingValue ? <FaStar className="text-sm"/> : <CiStar className="text-sm"/>}
                    </span>
                ))}
            </div>
        );
    }

    // For decimal ratings (original Rating component)
    return (
        <div className="flex items-center gap-0.5">
            {
                ratings >= 1 ? <span className='text-amber-500'><FaStar className="text-sm"/></span> :
                ratings >= .5 ? <span className='text-amber-500'><FaStarHalfAlt className="text-sm"/></span> : <span className='text-gray-300'><CiStar className="text-sm"/></span>
            }
            {
                ratings >= 2 ? <span className='text-amber-500'><FaStar className="text-sm"/></span> :
                ratings >= 1.5 ? <span className='text-amber-500'><FaStarHalfAlt className="text-sm"/></span> : <span className='text-gray-300'><CiStar className="text-sm"/></span>
            }
            {
                ratings >= 3 ? <span className='text-amber-500'><FaStar className="text-sm"/></span> :
                ratings >= 2.5 ? <span className='text-amber-500'><FaStarHalfAlt className="text-sm"/></span> : <span className='text-gray-300'><CiStar className="text-sm"/></span>
            }
            {
                ratings >= 4 ? <span className='text-amber-500'><FaStar className="text-sm"/></span> :
                ratings >= 3.5 ? <span className='text-amber-500'><FaStarHalfAlt className="text-sm"/></span> : <span className='text-gray-300'><CiStar className="text-sm"/></span>
            }
            {
                ratings >= 5 ? <span className='text-amber-500'><FaStar className="text-sm"/></span> :
                ratings >= 4.5 ? <span className='text-amber-500'><FaStarHalfAlt className="text-sm"/></span> : <span className='text-gray-300'><CiStar className="text-sm"/></span>
            }
        </div>
    );
};

export default Rating;