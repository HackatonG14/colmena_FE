const Banner = () => {
    return (
      <section className="bg-amber-50 py-12 px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-800">
            Intercambia <span className="text-amber-500">habilidades</span> y <span className="text-amber-500">servicios</span>
          </h2>
          <p className="text-gray-600 mt-4">
            Conectamos personas que valoran más el intercambio que el dinero. Forma parte de una comunidad colaborativa.
          </p>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img src="./banner-image.png" alt="Personas intercambiando habilidades" className="rounded-lg shadow-md" />
        </div>
      </section>
    );
  };
  
  export default Banner;
  