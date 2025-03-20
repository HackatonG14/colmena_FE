const Footer = () => {
    return (
      <footer className="bg-gray-100 p-6 mt-10 border-t border-gray-300">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <img src="/colmena-logo.png" alt="Colmena Logo" className="w-6 h-6" />
              <span className="text-lg font-semibold">Colmena</span>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Conectamos personas para intercambiar habilidades y servicios, construyendo una economía colaborativa y sostenible.
            </p>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="text-gray-500 hover:text-gray-700">🔵</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">🔷</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">📷</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">📘</a>
            </div>
          </div>
          <div className="flex space-x-12">
            <div>
              <h3 className="text-gray-800 font-semibold">Explorar</h3>
              <ul className="text-gray-600 text-sm mt-2 space-y-1">
                <li><a href="#" className="hover:text-gray-800">Inicio</a></li>
                <li><a href="#" className="hover:text-gray-800">Servicios</a></li>
                <li><a href="#" className="hover:text-gray-800">Categorías</a></li>
                <li><a href="#" className="hover:text-gray-800">Contacto</a></li>
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
        <div className="text-center text-gray-500 text-sm mt-6">© 2025 Colmena. Todos los derechos reservados.</div>
      </footer>
    );
  };
  
  export default Footer;
  