const Footer = () => {
  return (
    <footer className="bg-gray-100 p-6 mt-10 border-t border-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-2">
            <img src="/icon.svg" alt="Colmena Logo" className="w-6 h-6" />
            <span className="text-2xl font-semibold">Colmena</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Conectamos personas para intercambiar habilidades y servicios, construyendo una economía colaborativa y sostenible.
          </p>
        </div>
        <div className="w-full md:w-2/3 flex flex-col sm:flex-row justify-around text-center md:text-left gap-6">
          <div>
            <h3 className="text-gray-800 font-semibold">Explorar</h3>
            <ul className="text-gray-600 text-sm mt-2 space-y-1">
              <li><a href="#" className="hover:text-gray-800">Inicio</a></li>
              <li><a href="#" className="hover:text-gray-800">Servicios</a></li>
              <li><a href="#" className="hover:text-gray-800">Categorías</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold">Legal</h3>
            <ul className="text-gray-600 text-sm mt-2 space-y-1">
              <li><a href="#" className="hover:text-gray-800">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-gray-800">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-gray-800">Política de Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-6">© 2025 Colmena. Todos los derechos reservados.</div>
    </footer>
  );
};

export default Footer;
