import { Link } from "react-router-dom";

const AdCard = ({ id, imageUrl, title, description }) => {
  return (
    <Link to={`/ad/${id}`} className="block">
      <div className="border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition">
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-700">Imagen no disponible</span>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-2 text-black">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default AdCard;
