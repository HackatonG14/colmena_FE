import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

/**
 * Contact page component with contact information and a contact form
 */
const Contact = () => {
  const [loading, setLoading] = useState(false);
  
  // Form handling with custom hook
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
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Contact form submitted:', values);
        toast.success('¡Mensaje enviado correctamente!');
        resetForm();
        setLoading(false);
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Error al enviar el mensaje. Inténtalo de nuevo.');
        setLoading(false);
      }
    }
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Contáctanos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Información de Contacto</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-primary">Dirección</h3>
              <p className="mt-2 text-gray-600">
                Calle Principal 123<br />
                Ciudad, 12345<br />
                País
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-primary">Teléfono</h3>
              <p className="mt-2 text-gray-600">+123 456 7890</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-primary">Email</h3>
              <p className="mt-2 text-gray-600">info@mitienda.com</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-primary">Horario de Atención</h3>
              <p className="mt-2 text-gray-600">
                Lunes - Viernes: 9:00 AM - 6:00 PM<br />
                Sábado: 10:00 AM - 2:00 PM<br />
                Domingo: Cerrado
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Envíanos un Mensaje</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nombre"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Tu nombre"
              required
            />
            
            <Input
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="tu@email.com"
              required
            />
            
            <Input
              label="Asunto"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              error={errors.subject}
              placeholder="Asunto del mensaje"
              required
            />
            
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Mensaje
              </label>
              <textarea
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Tu mensaje..."
                required
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>
            
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
            >
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestra Ubicación</h2>
        <div className="bg-gray-200 h-[400px] rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Mapa de ubicación aquí</p>
        </div>
      </div>
    </div>
  );
};

export default Contact; 