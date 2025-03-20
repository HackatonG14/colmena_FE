const LoadMoreButton = ({ onClick }) => {
    return (
      <div className="flex justify-center mt-4">
        <button 
          onClick={onClick} 
          className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600"
        >
          Ver más
        </button>
      </div>
    );
  };
  
  export default LoadMoreButton;
  