import { useState } from "react";

const AdForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    advertiser: "",
    imageUrl: "",
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
      className="bg-amber-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">CREAR UN ANUNCIO</h2>
      <label className="block font-medium text-gray-700">Nombre de tu habilidad</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Ej: Programación Web"
        className="w-full p-2 border rounded-md mb-4"
        required
      />
      <label className="block font-medium text-gray-700">Descripción</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe tu habilidad..."
        className="w-full p-2 border rounded-md mb-4"
        required
      ></textarea>
      <label className="block font-medium text-gray-700">Categoría</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Ej: Desarrollo, Diseño..."
        className="w-full p-2 border rounded-md mb-4"
        required
      />
      <label className="block font-medium text-gray-700">Anunciante</label>
      <input
        type="text"
        name="advertiser"
        value={formData.advertiser}
        onChange={handleChange}
        placeholder="Tu nombre"
        className="w-full p-2 border rounded-md mb-4"
        required
      />
      <label className="block font-medium text-gray-700">URL imagen</label>
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="http://imagen.com/tu-habilidad.jpg"
        className="w-full p-2 border rounded-md mb-4"
      />
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-md shadow-md hover:bg-orange-600 transition"
      >
        Publicar anuncio
      </button>
    </form>
  );
};

export default AdForm;
