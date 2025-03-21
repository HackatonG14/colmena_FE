const API_URL = import.meta.env.VITE_API_URL;

export const getAds = async () => {
  const response = await fetch(`${API_URL}/ads`);
  if (!response.ok) throw new Error("Error obteniendo anuncios");
  return response.json();
};

export const getAdById = async (id) => {
  const response = await fetch(`${API_URL}/ads/${id}`);
  if (!response.ok) throw new Error("Anuncio no encontrado");
  return response.json();
};

export const createAd = async (adData) => {
  const response = await fetch(`${API_URL}/ads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adData),
  });
  if (!response.ok) throw new Error("Error creando anuncio");
  return response.json();
};

export const sendMessage = async (messageData) => {
  const response = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageData),
  });
  if (!response.ok) throw new Error("Error enviando mensaje");
  return response.json();
};
