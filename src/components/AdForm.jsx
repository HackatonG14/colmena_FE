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
      <h2 className="text-2xl font-semibold text-center mb-5">
        CREAR UN ANUNCIO
      </h2>
      <label className="block font-medium text-gray-700">
        Nombre de tu habilidad
      </label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Nombre de la Habilidad"
        className="w-full p-2 border border-gray-400 rounded-md mb-3 bg-white"
        required
      />
      <label className="block font-medium text-gray-700">Descripción</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full p-2 border border-gray-400 rounded-md mb-2 bg-white"
        required
      ></textarea>
      <label className="block font-medium text-gray-700">Categoría</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Categoría"
        className="w-full p-2 border border-gray-400 rounded-md mb-4 bg-white"
        required
      />
      <label className="block font-medium text-gray-700">Anunciante</label>
      <input
        type="text"
        name="advertiser"
        value={formData.advertiser}
        onChange={handleChange}
        placeholder="Anunciante"
        className="w-full p-2 border border-gray-400 rounded-md mb-5 bg-white"
        required
      />
      <label className="block font-medium text-gray-700">URL imagen</label>
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="URL Imagen"
        className="w-full p-2 border border-gray-400 rounded-md mb-5 bg-white"
      />
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-md shadow-md hover:bg-orange-600 transition mt-2"
      >
        Publicar anuncio
      </button>
    </form>
  );
};

export default AdForm;
