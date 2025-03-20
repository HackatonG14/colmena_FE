import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import './styles/globals.css'
import './index.css'
import App from './App.jsx'

// Componente para resetear el scroll cuando cambia la ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScrollToTop />
    <App />
  </StrictMode>,
)
