# Documentación Técnica - Colmena

## Índice

- [Arquitectura General](#arquitectura-general)
- [Estructura de Datos](#estructura-de-datos)
- [Flujos Principales](#flujos-principales)
- [Componentes Clave](#componentes-clave)
- [Gestión de Estado](#gestión-de-estado)
- [API y Comunicación](#api-y-comunicación)
- [Seguridad](#seguridad)
- [Optimización](#optimización)
- [Tecnologías y Dependencias](#tecnologías-y-dependencias)

## Arquitectura General

### Visión General

Colmena es una aplicación web SPA (Single Page Application) construida con React y Redux que implementa una arquitectura basada en componentes con gestión centralizada del estado. La aplicación sigue un patrón de diseño Flux unidireccional.

### Diagrama de Arquitectura

```
┌─────────────────┐       ┌───────────────┐       ┌───────────────┐
│  Components     │       │  Actions      │       │  API Client   │
│                 │──────▶│               │──────▶│               │
│  (React)        │       │  (Redux)      │       │  (Axios)      │
└─────────────────┘       └───────────────┘       └───────────────┘
        ▲                         │                      │
        │                         ▼                      │
        │                 ┌───────────────┐              │
        │                 │  Reducers     │              │
        │                 │               │              │
        │                 │  (Redux)      │              │
        │                 └───────────────┘              │
        │                         │                      │
        │                         ▼                      │
        │                 ┌───────────────┐              │
        └─────────────────│  Store        │◀─────────────┘
                          │               │
                          │  (Redux)      │
                          └───────────────┘
```

### Frontend

La aplicación está organizada siguiendo una estructura de características (feature-based), donde los componentes, acciones y reducers relacionados se agrupan por funcionalidad:

- **Components**: Componentes de React organizados por funcionalidad
- **Pages**: Vistas principales de la aplicación
- **Store**: Estado global gestionado por Redux Toolkit
- **Utils**: Funciones auxiliares y constantes
- **Hooks**: Hooks personalizados para reutilización de lógica
- **API**: Cliente para comunicación con backend

### Backend (Mock)

Actualmente, la aplicación utiliza datos de ejemplo y simulación de API para demostración, pero está diseñada para interactuar con una API RESTful.

## Estructura de Datos

### Modelos Principales

#### Usuario

```javascript
{
  id: string,
  name: string,
  email: string,
  avatar: string,
  role: 'user' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

#### Servicio

```javascript
{
  _id: string,
  name: string,
  slug: string,
  description: string,
  category: string,
  hoursRequired: number,
  price: number, // Equivalente en horas
  discount: number, // Porcentaje de descuento
  images: string[],
  stock: number, // Disponibilidad
  rating: number,
  review: Review[],
  exchangeFor: string, // Descripción de servicios aceptados a cambio
  shopInfo: {
    shopName: string,
    city: string,
    country: string
  },
  sellerId: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### Review

```javascript
{
  _id: string,
  userId: string,
  userName: string,
  rating: number,
  comment: string,
  date: Date,
  productId: string
}
```

#### Carrito

```javascript
{
  _id: string,
  userId: string,
  products: [
    {
      productId: string,
      quantity: number,
      productInfo: Service
    }
  ],
  total: number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Pedido

```javascript
{
  _id: string,
  userId: string,
  products: [
    {
      productId: string,
      quantity: number,
      productInfo: Service
    }
  ],
  status: 'pending' | 'completed' | 'cancelled',
  total: number,
  createdAt: Date,
  updatedAt: Date
}
```

## Flujos Principales

### Flujo de Autenticación

1. El usuario accede a la página de login o registro
2. Completa el formulario con sus credenciales
3. La acción `user_login` o `user_register` es despachada
4. Se realiza una petición a la API
5. Al recibir respuesta exitosa:
   - La información del usuario se almacena en el estado de Redux
   - Se guarda el token JWT en localStorage
   - Se redirige al usuario a la página principal
6. En caso de error, se muestra un mensaje de error

### Flujo de Exploración de Servicios

1. El usuario navega a la página de servicios (`/shops` o `/products`)
2. Se despacha la acción `get_products` para obtener la lista de servicios
3. Los filtros se aplican en el estado local o mediante acciones de Redux
4. Al seleccionar un servicio, se navega a la página de detalles (`/product/details/:slug`)
5. En la página de detalles, se despacha `product_details` para obtener información específica

### Flujo de Intercambio

1. El usuario selecciona un servicio y lo añade al carrito (acción `add_to_card`)
2. Navega al carrito (`/card`) donde puede ajustar cantidades
3. Procede al checkout (`/shipping`)
4. Confirma el intercambio, generando un pedido
5. El sistema registra el pedido y actualiza el estado

## Componentes Clave

### Componentes de UI Reutilizables

- **Button**: Botón personalizable con variantes de estilo
- **Rating**: Componente para mostrar y capturar valoraciones
- **Pagination**: Navegación entre páginas de resultados
- **Modal**: Ventanas modales para formularios y confirmaciones

### Componentes de Características

- **ShopProducts**: Renderiza la lista de servicios en diferentes formatos (grid/list)
- **Reviews**: Gestiona la visualización y envío de valoraciones
- **DetailsDescription**: Muestra la información detallada de un servicio

### Páginas Principales

- **Home**: Página principal con servicios destacados y categorías
- **Details**: Visualización detallada de un servicio específico
- **CategoryShop**: Exploración y filtrado de servicios por categoría
- **Card**: Gestión del carrito de intercambio
- **ConfirmOrder**: Finalización del proceso de intercambio

## Gestión de Estado

### Estructura del Store

```
store/
├── index.js            # Configuración principal de Redux
└── reducers/           # Reducers por funcionalidad
    ├── authReducer.js  # Autenticación y datos de usuario
    ├── cardReducer.js  # Carrito de intercambio
    └── homeReducer.js  # Productos, categorías y búsquedas
```

### Reducers Principales

#### `authReducer`

- Gestiona la autenticación del usuario
- Almacena información del perfil
- Maneja registro, login y logout

#### `cardReducer`

- Gestiona el carrito de intercambio
- Almacena productos seleccionados
- Calcula totales de horas
- Maneja lista de deseos (wishlist)

#### `homeReducer`

- Almacena listados de productos
- Gestiona categorías
- Maneja filtros y búsquedas
- Almacena detalles de productos individuales

### Acciones Asíncronas

Utilizamos Redux Thunk (a través de Redux Toolkit) para acciones asíncronas:

```javascript
export const product_details = createAsyncThunk(
  "product/product_details",
  async (slug, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product-details/${slug}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "Error al obtener detalles del servicio",
        status: error.response?.status,
      });
    }
  }
);
```

## API y Comunicación

### Cliente API

Utilizamos Axios como cliente HTTP configurado en `src/api/api.js`:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptores para manejo de tokens y errores
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

### Endpoints Principales

| Ruta                           | Método | Descripción                        |
| ------------------------------ | ------ | ---------------------------------- |
| `/auth/login`                  | POST   | Inicio de sesión                   |
| `/auth/register`               | POST   | Registro de usuario                |
| `/home/get-products`           | GET    | Obtener listado de servicios       |
| `/home/get-categorys`          | GET    | Obtener categorías disponibles     |
| `/home/product-details/:slug`  | GET    | Detalles de un servicio específico |
| `/home/customer/submit-review` | POST   | Enviar valoración de servicio      |
| `/home/query-products`         | GET    | Búsqueda filtrada de servicios     |

## Seguridad

### Autenticación

- Utilizamos JWT (JSON Web Tokens) para autenticación
- Los tokens se almacenan en localStorage
- Se incluyen en el header Authorization de las peticiones HTTP

### Protección de Rutas

- Implementamos ProtectRoute para rutas que requieren autenticación
- Redirección automática a login para usuarios no autenticados
- Control de acceso basado en roles (user/admin)

```jsx
// Ejemplo de ProtectRoute
const ProtectRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ returnUrl: location.pathname }} />
  );
};
```

## Optimización

### Rendimiento

- Lazy loading de componentes para reducir el tamaño del bundle inicial
- Memoización de componentes con React.memo
- Optimización de re-renderizados con useCallback y useMemo
- Carga diferida de imágenes con atributos loading="lazy"

### SEO y Accesibilidad

- Etiquetas semánticas HTML5
- Textos alternativos para imágenes
- Labels asociados con inputs en formularios
- Navegación por teclado
- Contraste de colores adecuado

## Tecnologías y Dependencias

### Core

- React 19
- Vite 6
- Redux Toolkit
- React Router DOM v7

### UI

- TailwindCSS
- React Icons
- React Hot Toast
- Swiper
- React Multi Carousel

### Útiles

- Axios
- Moment
- React Rating
- React Range
- React Window

### Extensibilidad

- Socket.io Client (preparado para chat)
- Stripe & Stripe React (preparado para pagos)

---

## Componentes Core - Detalles de Implementación

### ShopProducts

Componente encargado de mostrar los productos en formato grid o lista:

- Recibe una lista de productos y el estilo de visualización como props
- Gestiona la visualización de imágenes con fallbacks
- Implementa botones de favoritos con conexión a Redux
- Muestra información clave: nombre, precio (horas), valoración, ubicación

```jsx
// Implementación simplificada
const ShopProducts = ({ products = [], styles }) => {
  // Lógica para obtener imágenes y ubicación

  return (
    <>
      {styles === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Renderizado en grid */}
        </div>
      ) : (
        <div className="space-y-6">{/* Renderizado en lista */}</div>
      )}
    </>
  );
};
```

### Reviews

Componente para la gestión de reviews de servicios:

- Muestra resumen de valoraciones
- Permite filtrar por puntuación
- Formulario para envío de nuevas valoraciones
- Validación de formularios
- Conexión con Redux para persistencia

Este componente es particularmente importante ya que implementa la lógica de confianza entre usuarios, esencial para una plataforma de economía colaborativa.

### Button

Componente de UI crítico que soporta:

- Diferentes variantes visuales (primary, secondary, outline, text)
- Estados (loading, disabled)
- Soporte para iconos
- Renderizado condicional como Link de React Router
- Accesibilidad incorporada

La implementación se basa en composición para maximizar la reutilización y consistencia visual en toda la aplicación.

---

## Consideraciones para Futuras Ampliaciones

### Migración a TypeScript

La aplicación está preparada para migrar a TypeScript:

- Estructura de componentes compatible
- Uso de PropTypes que facilitará la transición a interfaces TS
- Documentación con JSDoc que puede convertirse a tipos TS

### Implementación de Backend

Para implementar un backend completo, se recomienda:

- Desarrollar una API RESTful con Node.js/Express o similar
- Implementar los endpoints ya definidos en la aplicación
- Utilizar MongoDB para almacenar los datos con la estructura existente
- Implementar autenticación JWT como ya está previsto en el frontend

### Sistema de Mensajería

La integración de chat entre usuarios debería:

- Utilizar Socket.io (ya incluido como dependencia)
- Implementar salas de chat basadas en los IDs de intercambio
- Almacenar historial de mensajes
- Notificaciones en tiempo real

### Sistema de Reputación Avanzado

Para fortalecer la confianza en la plataforma:

- Implementar verificación de identidad
- Sistema de puntos de reputación
- Badges y niveles de confianza
- Referencias cruzadas entre usuarios

Estos elementos son fundamentales para el funcionamiento de una economía colaborativa exitosa.
