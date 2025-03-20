import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiPhone, FiClock } from 'react-icons/fi';

/**
 * Contact page component with updated design
 */
const Contact = () => {
  const [loading, setLoading] = useState(false);
  
  const { values, handleChange, handleSubmit, errors, resetForm } = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = 'El nombre es requerido';
      if (!values.email) errors.email = 'El email es requerido';
      else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email no válido';
      if (!values.subject) errors.subject = 'El asunto es requerido';
      if (!values.message) errors.message = 'El mensaje es requerido';
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Contact form submitted:', values);
        toast.success('¡Mensaje enviado correctamente!');
        resetForm();
        setLoading(false);
      } catch {
        toast.error('Error al enviar el mensaje. Inténtalo de nuevo.');
        setLoading(false);
      }
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-light text-gray-900">
              <span className="text-amber-500 font-medium">Contáctanos</span>
            </h1>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Estamos aquí para ayudarte con cualquier pregunta sobre el intercambio de servicios
            </p>
            <div className="mt-4 flex justify-center text-sm">
              <Link
                to="/"
                className="text-amber-500 hover:text-amber-600 transition-colors mr-2"
              >
                Inicio
              </Link>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-700">Contacto</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Info */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-medium text-gray-800 mb-6">Información de contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 flex-shrink-0">
                      <FiMail />
                    </div>
                    <div>
                      <h3 className="text-gray-700 font-medium">Email</h3>
                      <p className="text-gray-600 mt-1">info@colmena.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 flex-shrink-0">
                      <FiMapPin />
                    </div>
                    <div>
                      <h3 className="text-gray-700 font-medium">Ubicación</h3>
                      <p className="text-gray-600 mt-1">Calle Principal 123, Ciudad</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 flex-shrink-0">
                      <FiPhone />
                    </div>
                    <div>
                      <h3 className="text-gray-700 font-medium">Teléfono</h3>
                      <p className="text-gray-600 mt-1">+123 456 7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 flex-shrink-0">
                      <FiClock />
                    </div>
                    <div>
                      <h3 className="text-gray-700 font-medium">Horario de atención</h3>
                      <p className="text-gray-600 mt-1">Lunes a Viernes: 9am - 6pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-xl font-medium text-gray-800 mb-6">Envíanos un mensaje</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name ? 'border-red-500' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors`}
                        placeholder="Tu nombre"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                    <input
                      type="text"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.subject ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors`}
                      placeholder="Asunto del mensaje"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={values.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors resize-none`}
                      placeholder="¿En qué podemos ayudarte?"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3 px-6 rounded-full text-white font-medium transition-colors shadow-sm ${
                        loading ? 'bg-amber-400' : 'bg-amber-500 hover:bg-amber-600'
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : 'Enviar mensaje'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 