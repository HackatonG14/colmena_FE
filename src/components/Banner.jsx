const Banner = () => {
  return (
    <section className="bg-amber-50 py-12 px-6 flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-800 leading-tight">
          Intercambia <span className="text-amber-500">habilidades</span> y <span className="text-amber-500">servicios</span>
        </h2>
        <p className="text-gray-600 mt-4 text-lg sm:text-xl">
          Conectamos personas que valoran más el intercambio que el dinero. Forma parte de una comunidad colaborativa.
        </p>
      </div>
      <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <img 
          src="./banner-image.png" 
          alt="Personas intercambiando habilidades" 
          className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default Banner;
