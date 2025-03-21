import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdForm from "../components/AdForm";

const CreateAd = () => {
  const handleFormSubmit = (formData) => {
    console.log("Anuncio creado:", formData);
    alert("Anuncio publicado con éxito!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <AdForm onSubmit={handleFormSubmit} />
      </main>
      <Footer />
    </div>
  );
};

export default CreateAd;
