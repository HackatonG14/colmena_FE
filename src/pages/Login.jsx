import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { useAuth, useForm } from '../hooks';
import { FiMail, FiLock } from 'react-icons/fi';

/**
 * Login page component
 */
const Login = () => {
    const navigate = useNavigate();
    const { loginUser, isAuthenticated, isLoading } = useAuth();
    const [formError, setFormError] = useState(null);

    // Form submission handler
    const handleSubmit = (values) => {
        loginUser(values);
    };

    // Custom form hook
    const { 
        values, 
        errors, 
        touched, 
        handleChange, 
        handleBlur, 
        handleSubmit: submitForm 
    } = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) errors.email = 'El correo electrónico es requerido';
            if (!values.password) errors.password = 'La contraseña es requerida';
            return errors;
        },
        onSubmit: handleSubmit
    });

    // Redirect if authenticated
    useEffect(() => { 
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-amber-50/30 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            {isLoading && (
                <div className='fixed inset-0 flex justify-center items-center bg-white/80 backdrop-blur-sm z-[999]'>
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
                            Inicia sesión en tu <span className="text-amber-500 font-medium">cuenta</span>
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Accede para empezar a intercambiar servicios
                        </p>
                    </div>
                    
                    <form onSubmit={submitForm} className="space-y-6">
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiMail />
                                </div>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        touched.email && errors.email ? 'border-red-500' : 'border-gray-200'
                                    } rounded-xl bg-gray-50/50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition-colors`}
                                    placeholder="Tu correo electrónico"
                                />
                            </div>
                            {touched.email && errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>
                        
                        <div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FiLock />
                                </div>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        touched.password && errors.password ? 'border-red-500' : 'border-gray-200'
                                    } rounded-xl bg-gray-50/50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition-colors`}
                                    placeholder="Tu contraseña"
                                />
                            </div>
                            {touched.password && errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Recordarme
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link to="#" className="text-amber-500 hover:text-amber-600">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full flex justify-center py-3 px-4 rounded-xl text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors font-medium"
                            disabled={isLoading}
                        >
                            Iniciar sesión
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes cuenta?{' '}
                            <Link to="/register" className="font-medium text-amber-500 hover:text-amber-600 transition-colors">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;