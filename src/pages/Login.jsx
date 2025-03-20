import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { useAuth, useForm } from '../hooks';

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
        <div className="min-h-screen bg-white flex flex-col">
            {isLoading && (
                <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader color="#F59E0B" />
                </div>
            )}
            
            {/* Banner */}
            <section className="bg-amber-50 py-16">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Iniciar Sesión</h1>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Accede a tu cuenta para ver tus intercambios y gestionar tu perfil
                        </p>
                        <div className="mt-6 flex justify-center">
                            <Link 
                                to="/" 
                                className="text-amber-500 hover:text-amber-600 transition-colors mr-2"
                            >
                                Inicio
                            </Link>
                            <span className="text-gray-400 mx-2">/</span>
                            <span className="text-gray-700">Iniciar Sesión</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex-grow py-12">
                <div className="max-w-md mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        {/* Formulario de Login */}
                        <div className="p-8 md:p-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ingresa a tu cuenta</h2>
                            
                            <form onSubmit={submitForm} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Correo electrónico
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
                                        placeholder="ejemplo@correo.com"
                                    />
                                    {touched.email && errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Contraseña
                                        </label>
                                        <Link to="#" className="text-sm text-amber-500 hover:text-amber-600 transition-colors">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </div>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors`}
                                        placeholder="••••••••"
                                    />
                                    {touched.password && errors.password && (
                                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors font-medium"
                                    disabled={isLoading}
                                >
                                    Iniciar sesión
                                </button>
                            </form>
                            
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">O continúa con</span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 mt-6">
                                    <button 
                                        type="button" 
                                        className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                        <FaGoogle className="text-red-500 mr-2" />
                                        <span>Google</span>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                        <FaFacebookF className="text-blue-600 mr-2" />
                                        <span>Facebook</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    ¿No tienes cuenta?{' '}
                                    <Link to="/register" className="font-medium text-amber-500 hover:text-amber-700 transition-colors">
                                        Regístrate
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-6 space-y-3">
                                <a 
                                    href="http://localhost:3001/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-white bg-amber-600 hover:bg-amber-700 transition-colors"
                                >
                                    Iniciar sesión como proveedor
                                </a>
                                <a 
                                    href="http://localhost:3001/register"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg text-amber-600 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    Registrarse como proveedor
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;