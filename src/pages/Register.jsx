import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_register, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
 
const Register = () => {
    const navigate = useNavigate();
    const { loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth);
 
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });
    
    const dispatch = useDispatch();

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
 
    const register = (e) => {
        e.preventDefault();
        dispatch(customer_register(state));
    };
     
    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        } 
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        } 
        if (userInfo) {
            navigate('/');
        }
    }, [successMessage, errorMessage, userInfo, dispatch, navigate]);

    return (
        <div className="min-h-screen bg-amber-50/30 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            {loader && (
                <div className="fixed inset-0 flex justify-center items-center bg-white/80 backdrop-blur-sm z-[999]">
                    <FadeLoader color="#F59E0B" />
                </div>
            )}
            
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="py-10 px-8 sm:px-12">
                    <div className="mb-8 text-center">
                        <Link to="/" className="inline-flex items-center mb-6">
                            <img src="/icon.svg" alt="" className="h-8 w-auto" />
                            <span className="ml-2 text-xl font-medium text-gray-900">Colmena</span>
                        </Link>
                        <h2 className="text-2xl font-light text-gray-900">
                            Crea tu <span className="text-amber-500 font-medium">cuenta</span>
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Únete a la comunidad y empieza a intercambiar servicios
                        </p>
                    </div>
                    
                    <form onSubmit={register} className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiUser />
                            </div>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={state.name}
                                onChange={inputHandle}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition-colors"
                                placeholder="Tu nombre completo"
                            />
                        </div>
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiMail />
                            </div>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={state.email}
                                onChange={inputHandle}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition-colors"
                                placeholder="Tu correo electrónico"
                            />
                        </div>
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <FiLock />
                            </div>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={state.password}
                                onChange={inputHandle}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition-colors"
                                placeholder="Crea una contraseña"
                            />
                        </div>
                        
                        <div className="flex items-center">
                            <input 
                                id="terms" 
                                name="terms" 
                                type="checkbox" 
                                className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                Acepto los <Link to="#" className="text-amber-500 hover:text-amber-600">términos y condiciones</Link>
                            </label>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full flex justify-center py-3 px-4 rounded-xl text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors font-medium"
                        >
                            Crear cuenta
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" className="font-medium text-amber-500 hover:text-amber-600 transition-colors">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;