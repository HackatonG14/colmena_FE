import React, { useEffect, useState } from 'react';
import success from '../assets/success.png';
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

const ConfirmOrder = () => {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        // Simular un tiempo de carga
        const timer = setTimeout(() => {
            setLoader(false);
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {loader ? 
                <FadeLoader color="#F59E0B" /> : 
                <>
                    <img src={success} alt="Orden confirmada" />
                    <h2 className="text-2xl font-bold text-green-600 mt-4">¡Pedido confirmado!</h2>
                    <p className="text-gray-600 mb-4 text-center max-w-md">
                        Tu pedido ha sido confirmado y pronto te contactaremos para coordinar el intercambio.
                    </p>
                    <Link 
                        className='px-5 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-white transition-colors shadow-sm' 
                        to="/dashboard/my-orders"
                    >
                        Ver mis pedidos
                    </Link>
                </>
            }
        </div>
    );
};

export default ConfirmOrder;