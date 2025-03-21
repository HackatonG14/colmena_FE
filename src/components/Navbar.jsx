import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-300 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src="/icon.svg" alt="Colmena Logo" className="w-6 h-6" />
          </Link>
          <span className="text-2xl font-semibold">Colmena</span>
        </div>

        <div className="hidden md:flex space-x-8 text-lg">
          <Link to="/" className="text-gray-700 hover:text-black font-bold">
            Inicio
          </Link>
          <Link to="/createAd" className="text-gray-700 hover:text-black font-bold">
            Crear Anuncio
          </Link>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4 text-lg">
          <Link to="/" className="text-gray-700 hover:text-black font-bold" onClick={() => setIsOpen(false)}>
            Inicio
          </Link>
          <Link to="/createAd" className="text-gray-700 hover:text-black font-bold" onClick={() => setIsOpen(false)}>
            Crear Anuncio
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
