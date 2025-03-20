import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

/**
 * Simplified Contact page component
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
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Contáctanos</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              } focus:outline-none focus:ring-2 focus:ring-amber-500`}
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
  );
};

export default Contact; 