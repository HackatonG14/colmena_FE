# Colmena - Sistema de Intercambio de Servicios

![Colmena Logo](public/banner-image.png)

## Descripción del Proyecto

Colmena es una plataforma de intercambio de servicios que permite a los usuarios ofrecer sus habilidades y conocimientos a cambio de otros servicios, en lugar de utilizar dinero. Este sistema fomenta la economía colaborativa y crea una comunidad donde el tiempo y las habilidades son la moneda de cambio principal.

## Características Principales

- **Intercambio de Servicios**: Los usuarios pueden ofrecer y solicitar servicios basados en habilidades.
- **Sistema de Valoración**: Calificaciones y reseñas para construir confianza en la comunidad.
- **Catálogo de Servicios**: Exploración y búsqueda avanzada con filtros por categoría, valoración y ubicación.
- **Panel de Usuario**: Gestión de servicios ofrecidos, recibidos y lista de favoritos.
- **Diseño Responsive**: Experiencia optimizada para dispositivos móviles y de escritorio.
- **Autenticación de Usuarios**: Sistema de registro e inicio de sesión seguro.

## Tecnologías Utilizadas

- **Frontend**: React 19, Vite 6
- **Gestión de Estado**: Redux Toolkit
- **Enrutamiento**: React Router v7
- **Estilos**: TailwindCSS
- **Notificaciones**: React Hot Toast
- **Manejo de Formularios**: Hooks personalizados
- **Renderizado Optimizado**: React Window para listas largas
- **Comunicación en Tiempo Real**: Socket.io (preparado para implementación)
- **Pasarela de Pagos**: Stripe (preparado para implementación futura)

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Git

## Instalación y Configuración

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/hackaton_colmena.git
   cd hackaton_colmena
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. **Iniciar el servidor de desarrollo**:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Construir para producción**:
   ```bash
   npm run build
   # o
   yarn build
   ```

## Estructura del Proyecto

```
hackaton_colmena/
├── public/                  # Archivos estáticos
├── src/                     # Código fuente
│   ├── api/                 # Configuración y llamadas a la API
│   │   └── api/            # Configuración y llamadas a la API
│   ├── components/          # Componentes reutilizables
│   │   ├── features/        # Componentes de características específicas
│   │   ├── products/        # Componentes relacionados con servicios
│   │   └── ui/              # Componentes UI genéricos (botones, inputs, etc.)
│   ├── hooks/               # Hooks personalizados
│   ├── layouts/             # Estructuras de página compartidas
│   ├── pages/               # Componentes de página
│   ├── routes/              # Configuración de rutas
│   ├── store/               # Configuración de Redux y reducers
│   │   └── reducers/        # Reducers para gestión de estado
│   ├── styles/              # Estilos globales y configuración de temas
│   ├── utils/               # Funciones utilitarias
│   ├── App.jsx              # Componente principal de la aplicación
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales CSS
├── .eslintrc.js             # Configuración de ESLint
├── postcss.config.cjs       # Configuración de PostCSS
├── tailwind.config.js       # Configuración de TailwindCSS
├── vite.config.js           # Configuración de Vite
└── package.json             # Dependencias y scripts
```

## Arquitectura del Proyecto

### Patrón de Diseño

El proyecto sigue una arquitectura basada en componentes usando React con un enfoque modular y escalable. Utiliza:

- **Flux Unidireccional**: Implementado a través de Redux para gestión de estado.
- **Componentes Funcionales**: Con React Hooks para la lógica de estado y efectos.
- **Container/Presentational Pattern**: Separación de lógica y presentación.
- **Lazy Loading**: Carga diferida de componentes para optimizar el rendimiento.

### Flujo de Datos

1. **API** → **Redux Actions** → **Redux Reducers** → **Store** → **Componentes React**
2. **Eventos de Usuario** → **Redux Actions** → (ciclo nuevamente)

### Gestión de Estado

- **Global**: Redux Toolkit para estado global (autenticación, carrito, etc.)
- **Local**: React useState/useReducer para estado de componentes
- **Persistencia**: Local Storage para mantener sesiones y preferencias

## Guías para Desarrolladores

### Convenciones de Código

- **Nomenclatura**: Utilizar camelCase para variables y funciones, PascalCase para componentes.
- **Componentes**: Un componente por archivo, exportados como default.
- **Estilos**: Utilizar clases TailwindCSS y agrupar modificadores.
- **Importaciones**: Ordenar: React, librerías externas, componentes internos, utils, estilos.

### Estilos y Temas

El proyecto utiliza TailwindCSS con personalización para mantener una identidad visual consistente:

- **Colores Primarios**: Paleta de ámbar (`amber-500`, `amber-600`) para elementos principales.
- **Diseño**: Minimalista y elegante con bordes redondeados y sombras sutiles.
- **Responsivo**: Diseño mobile-first con breakpoints definidos.

### Buenas Prácticas

1. **Componentes**:

   - Mantén los componentes pequeños y enfocados en una sola responsabilidad.
   - Extrae lógica compleja a hooks personalizados.
   - Utiliza memoización (React.memo, useMemo, useCallback) para optimizar rendimiento.

2. **Estado**:

   - Define claramente qué va en Redux vs. estado local.
   - Implementa fetching de datos con indicadores de loading y manejo de errores.
   - Utiliza acciones tipadas para mejor depuración.

3. **Rendimiento**:

   - Implementa Code Splitting para reducir el tamaño del bundle inicial.
   - Optimiza imágenes y recursos estáticos.
   - Utiliza Lighthouse para monitorear rendimiento.

4. **Accesibilidad**:
   - Mantén un ratio de contraste adecuado.
   - Implementa navegación por teclado.
   - Incluye textos alternativos para imágenes.

### Integración Continua

El proyecto está preparado para implementar CI/CD mediante:

- Tests automatizados (pendiente de implementación)
- Linting y formateo previo a commits
- Despliegue automático en entornos de staging y producción

## Ampliaciones Futuras

El proyecto está diseñado para escalar con nuevas funcionalidades:

1. **Mensajería Interna**: Sistema de chat entre usuarios.
2. **Pagos Premium**: Servicios destacados o membresías especiales.
3. **Localización**: Soporte multi-idioma.
4. **PWA**: Conversión a Progressive Web App.
5. **Implementación Backend**: Desarrollo de API REST completa.
6. **Mobile App**: Versiones nativas usando React Native.

### Cómo Contribuir a Ampliaciones

Para implementar nuevas características sin generar deuda técnica:

1. **Planificación**:

   - Crea un documento de diseño técnico (TDD) con requisitos y arquitectura.
   - Consulta con el equipo para integración con componentes existentes.

2. **Implementación**:

   - Crea una rama feature/ para el desarrollo.
   - Sigue patrones existentes y nomenclatura.
   - Actualiza documentación al añadir nuevas características.

3. **Revisión**:
   - Solicita code reviews antes de fusionar.
   - Implementa pruebas para nuevas funcionalidades.
   - Verifica compatibilidad con dispositivos y navegadores.

## Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).

## Contacto

Para preguntas o colaboraciones, contacta a través de:

- Email: [contacto@colmena.com](mailto:contacto@colmena.com)
- GitHub: [github.com/colmena](https://github.com/colmena)

---

© 2024 Colmena. Todos los derechos reservados.
