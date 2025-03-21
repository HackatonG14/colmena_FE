import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
      <div className="flex items-center gap-2">
        <Link to="/"><img src="/icon.svg" alt="Colmena Logo" className="w-6 h-6" /></Link>
        <span className="text-2xl font-semibold">Colmena</span>
      </div>
      <div className="flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-black font-bold">Inicio</Link>
        <Link to="/crear-anuncio" className="text-gray-700 hover:text-black font-bold">Crear Anuncio</Link>
      </div>
    </nav>
  );
};

export default Navbar;