import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdDetailsCard from "../components/AdDetailsCard";
import ContactForm from "../components/ContactForm"; 

const mockAds = [
  {
    id: "1",
    title: "Clases de Programación Web",
    advertiser: "Juan Pérez",
    date: "21 de marzo de 2025",
    category: "Desarrollo",
    description: "Ofrezco clases de desarrollo web con HTML, CSS y JavaScript.",
    imageUrl: "https://via.placeholder.com/600",
  },
];

const AdDetails = () => {
  const { id } = useParams();
  const ad = mockAds.find((ad) => ad.id === id) || {}; 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 md:px-8 lg:px-16">
        {ad.title ? (
          <div className="max-w-5xl mx-auto">
            <AdDetailsCard ad={ad} />

            <div className="mt-8">
              <ContactForm onSubmit={(data) => console.log("Mensaje enviado:", data)} />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Anuncio no encontrado.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdDetails;
