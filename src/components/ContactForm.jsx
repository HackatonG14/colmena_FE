import { useState } from "react";

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-amber-100 p-6 rounded-lg shadow-md w-full max-w-sm"
    >
      <h3 className="text-lg font-semibold text-black mb-4">CONTACTA CON EL ANUNCIANTE</h3>
      <label className="block font-medium text-gray-700">Nombre</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder=""
        className="w-full p-2 border border-gray-400 rounded-md mb-3 bg-white"
        required
      />
      <label className="block font-medium text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder=""
        className="w-full p-2 border border-gray-400 rounded-md mb-3 bg-white"
        required
      />
      <label className="block font-medium text-gray-700">Comentario</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder=""
        className="w-full p-2 border border-gray-400 rounded-md mb-4 bg-white"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-md shadow-md hover:bg-orange-600 transition"
      >
        Mandar mensaje
      </button>
    </form>
  );
};

export default ContactForm;
