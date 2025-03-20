import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, useLocation } from 'react-router-dom'
import store from './store'
import './styles/globals.css'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

// Componente para resetear el scroll cuando cambia la ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <ScrollToTop />
        <App />
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              background: '#283046',
              color: 'white'
            }
          }}
        />
      </StrictMode>
    </BrowserRouter>
  </Provider>
)
