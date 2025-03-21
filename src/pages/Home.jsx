import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdCard from "../components/AdCard";
import { getAds } from "../services/api";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAds()
      .then(setAds)
      .catch(error => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 md:px-8 lg:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Servicios Ofertados</h2>
        {loading ? (
          <p className="text-center text-gray-500">Cargando anuncios...</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            {ads.map((ad) => (
              <AdCard key={ad.id} {...ad} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
