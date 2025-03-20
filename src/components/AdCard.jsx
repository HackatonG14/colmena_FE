const AdCard = ({ URLimage, title, description }) => {
    return (
      <div className="border rounded-lg shadow-md p-4 text-center">
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-700">{URLimage}</span>
        </div>
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };
  
  export default AdCard;