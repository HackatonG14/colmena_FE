const AdDetailsCard = ({ ad }) => {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-black mb-4">{ad.title}</h1>
  
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <img
              src={ad.imageUrl || "/placeholder-image.png"}
              alt={ad.title}
              className="w-full h-64 object-cover bg-gray-300 rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/3">
            <ContactForm onSubmit={(data) => console.log("Mensaje enviado:", data)} />
          </div>
        </div>
        <div className="mt-6">
          <p className="text-lg font-medium text-gray-700">Anunciante: {ad.advertiser}</p>
          <p className="text-gray-600">Fecha de publicación: {ad.date}</p>
          <p className="text-gray-600">Categoría: {ad.category}</p>
          <p className="text-gray-600 mt-2">{ad.description}</p>
        </div>
      </div>
    );
  };
  
  export default AdDetailsCard;
  