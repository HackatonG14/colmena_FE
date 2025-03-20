import { useState, useCallback } from 'react';
import { validateEmail, validatePassword } from '../utils/helpers';

/**
 * Custom hook for form handling
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Form submission handler
 * @param {Function} validate - Custom validation function
 * @returns {Object} Form state and handlers
 */
const useForm = (initialValues, onSubmit, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    if (touched[name]) {
      validateField(name, type === 'checkbox' ? checked : value);
    }
  }, [touched]);

  /**
   * Handle input blur
   * @param {Event} e - Input blur event
   */
  const handleBlur = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, type === 'checkbox' ? checked : value);
  }, []);

  /**
   * Validate a single field
   * @param {string} name - Field name
   * @param {any} value - Field value
   */
  const validateField = useCallback((name, value) => {
    let error = '';

    if (validate) {
      const customErrors = validate({ [name]: value });
      if (customErrors && customErrors[name]) {
        error = customErrors[name];
      }
    } else {
      // Default validations
      if (value === '' || value === undefined || value === null) {
        error = 'Este campo es obligatorio';
      } else if (name === 'email' && !validateEmail(value)) {
        error = 'Correo electrónico no válido';
      } else if (name === 'password' && !validatePassword(value)) {
        error = 'La contraseña debe tener al menos 8 caracteres';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  }, [validate]);

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Check if form is valid
   * @returns {boolean} Is form valid
   */
  const isValid = useCallback(() => {
    // Validate all fields
    const fieldNames = Object.keys(values);
    let isFormValid = true;

    const newErrors = {};
    const newTouched = {};

    fieldNames.forEach((name) => {
      newTouched[name] = true;
      const isFieldValid = validateField(name, values[name]);
      if (!isFieldValid) {
        isFormValid = false;
      }
    });

    setTouched(newTouched);
    return isFormValid;
  }, [values, validateField]);

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isValid()) {
      onSubmit(values, {
        resetForm,
        setErrors,
        setSubmitting: setIsSubmitting,
      });
    } else {
      setIsSubmitting(false);
    }
  }, [values, onSubmit, isValid, resetForm]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};

export default useForm; 