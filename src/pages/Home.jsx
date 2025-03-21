import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import AdCard from "../components/AdCard";
import Footer from "../components/Footer";
import LoadMoreButton from "../components/LoadMoreButton";
import { useState } from "react";

const initialAds = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Servicio ${i + 1}`,
  description: `Descripción del servicio ${i + 1}`,
}));

const extraAds = Array.from({ length: 8 }, (_, i) => ({
  id: i + 13,
  title: `Servicio Extra ${i + 1}`,
  description: `Descripción extra ${i + 1}`,
}));

const Home = () => {
  const [ads, setAds] = useState(initialAds);

  const loadMoreAds = () => {
    setAds([...ads, ...extraAds]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-10 px-4 md:px-8 lg:px-16">
          <Banner />
        </section>
        <section className="py-10 px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Servicios Ofertados</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            {ads.map((ad) => (
              <AdCard key={ad.id} title={ad.title} description={ad.description} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <LoadMoreButton onClick={loadMoreAds} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
