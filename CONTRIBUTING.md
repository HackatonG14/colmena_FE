# Guía de Contribución a Colmena

¡Gracias por tu interés en contribuir al proyecto Colmena! Esta guía proporciona detalles sobre cómo puedes aportar al desarrollo de nuestra plataforma de intercambio de servicios.

## Índice

- [Código de Conducta](#código-de-conducta)
- [Configuración del Entorno](#configuración-del-entorno)
- [Flujo de Trabajo con Git](#flujo-de-trabajo-con-git)
- [Guías de Estilo](#guías-de-estilo)
- [Testing](#testing)
- [Documentación](#documentación)
- [Proceso de Revisión](#proceso-de-revisión)
- [Reporte de Bugs](#reporte-de-bugs)
- [Propuesta de Funcionalidades](#propuesta-de-funcionalidades)

## Código de Conducta

Este proyecto se adhiere a un Código de Conducta que esperamos que todos los participantes respeten. Por favor, lee [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) para conocer los detalles.

## Configuración del Entorno

### Requisitos de Desarrollo

- Node.js (versión 18 o superior)
- npm o yarn
- Editor con soporte para ESLint y Prettier (recomendamos VS Code)

### Plugins Recomendados para VS Code

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Path Intellisense
- Import Cost

### Configuración Inicial

1. **Haz un fork del repositorio** en GitHub.
2. **Clona tu fork** a tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/hackaton_colmena.git
   cd hackaton_colmena
   ```
3. **Añade el repositorio original como remote upstream**:
   ```bash
   git remote add upstream https://github.com/colmena/hackaton_colmena.git
   ```
4. **Instala las dependencias**:
   ```bash
   npm install
   # o
   yarn install
   ```
5. **Configura las variables de entorno**:
   Crea un archivo `.env` basado en `.env.example`.

## Flujo de Trabajo con Git

1. **Sincroniza tu fork** antes de comenzar a trabajar:

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Crea una rama para tu contribución**:

   - Usa prefijos descriptivos:
     - `feature/` para nuevas características
     - `fix/` para correcciones de bugs
     - `docs/` para cambios en documentación
     - `refactor/` para refactorizaciones
     - `test/` para añadir o modificar tests

   Ejemplo:

   ```bash
   git checkout -b feature/sistema-mensajeria
   ```

3. **Commits**:

   - Haz commits pequeños y enfocados en un solo cambio.
   - Usa mensajes descriptivos siguiendo el formato:

     ```
     tipo(alcance): descripción corta

     Descripción más detallada si es necesario.
     ```

     Donde `tipo` puede ser: feat, fix, docs, style, refactor, test, chore.

4. **Pull Requests**:
   - Actualiza tu rama con los últimos cambios de main antes de crear el PR.
   - Proporciona una descripción detallada de los cambios.
   - Enlaza issues relacionados usando `Closes #123` o `Fixes #123`.
   - Asegúrate de que todos los tests pasan y no hay conflictos.

## Guías de Estilo

### JavaScript / React

- Utiliza ES6+ y funciones de flecha.
- Prioriza componentes funcionales con Hooks sobre componentes de clase.
- Desestructura props y variables de estado.
- Extrae lógica compleja en hooks personalizados.
- Utiliza PropTypes o TypeScript para tipado.

Ejemplo de componente:

```jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { someAction } from "../store/actions";

const ExampleComponent = ({ initialValue, onSubmit }) => {
  const [value, setValue] = useState(initialValue);
  const dispatch = useDispatch();

  useEffect(() => {
    // Efecto secundario
  }, [dependency]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2"
      />
      <button
        onClick={() => onSubmit(value)}
        className="bg-amber-500 text-white px-4 py-2 rounded-lg ml-2"
      >
        Enviar
      </button>
    </div>
  );
};

ExampleComponent.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ExampleComponent;
```

### CSS / TailwindCSS

- Utiliza clases de Tailwind siempre que sea posible.
- Agrupa las clases en un orden lógico:
  1. Layout (position, display, flexbox, grid)
  2. Dimensiones (width, height)
  3. Espaciado (margin, padding)
  4. Tipografía (font, text)
  5. Visuales (background, border, shadow)
  6. Estados (hover, focus, active)
- Para estilos complejos, utiliza componentes con estilos predefinidos o crea utilitarios.

### Nombrado

- **Archivos**: Usa PascalCase para componentes y camelCase para utilidades.
- **Componentes**: PascalCase como `UserProfile.jsx`.
- **Funciones**: camelCase como `fetchUserData()`.
- **Constantes**: UPPER_SNAKE_CASE como `API_BASE_URL`.
- **Variables de estado**: camelCase con prefijos descriptivos como `isLoading`, `hasError`.

## Testing

### Herramientas

- Jest para tests unitarios
- React Testing Library para tests de componentes
- Cypress para tests e2e (por implementar)

### Convenciones

- Los archivos de test deben estar cerca del código que prueban.
- Nombrar archivos como `ComponentName.test.jsx`.
- Agrupar tests relacionados en bloques `describe`.
- Escribir descripciones claras para cada test.

Ejemplo de test:

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import ExampleComponent from "./ExampleComponent";

describe("ExampleComponent", () => {
  it("renders with initial value", () => {
    const handleSubmit = jest.fn();
    render(<ExampleComponent initialValue="test" onSubmit={handleSubmit} />);

    expect(screen.getByRole("textbox")).toHaveValue("test");
  });

  it("calls onSubmit when button is clicked", () => {
    const handleSubmit = jest.fn();
    render(<ExampleComponent initialValue="test" onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));
    expect(handleSubmit).toHaveBeenCalledWith("test");
  });
});
```

## Documentación

### Documentación de Código

- Utiliza JSDoc para documentar funciones, componentes y props.
- Incluye ejemplos de uso para APIs complejas.

Ejemplo:

```jsx
/**
 * Componente que muestra información de un servicio.
 *
 * @param {Object} props - Las propiedades del componente
 * @param {Object} props.service - Objeto con datos del servicio
 * @param {string} props.service.id - ID único del servicio
 * @param {string} props.service.name - Nombre del servicio
 * @param {string} props.service.description - Descripción del servicio
 * @param {function} props.onSelect - Callback llamado cuando se selecciona el servicio
 * @returns {React.Component} Componente de tarjeta de servicio
 */
const ServiceCard = ({ service, onSelect }) => {
  // Implementación
};
```

### Documentación del Proyecto

- Actualiza el README.md cuando añadas características importantes.
- Mantén la documentación de API actualizada.
- Crea o actualiza tutoriales cuando sea necesario.

## Proceso de Revisión

1. El autor del PR completa una auto-revisión usando la lista de verificación.
2. Al menos un miembro del equipo principal debe aprobar el PR.
3. Todos los comentarios deben ser resueltos antes de la fusión.
4. El código debe pasar todas las pruebas automatizadas.
5. Se requiere rebasing antes de la fusión para mantener un historial limpio.

### Lista de Verificación para PRs

- [ ] El código sigue las guías de estilo del proyecto
- [ ] Todos los tests pasan
- [ ] Se ha añadido documentación si es necesario
- [ ] No hay código comentado sin explicación
- [ ] No hay console.logs de depuración
- [ ] El código es performante y optimizado
- [ ] El diseño es responsive y accesible

## Reporte de Bugs

Para reportar un bug, crea un issue en GitHub con la etiqueta "bug" e incluye:

1. **Título**: Breve descripción del problema
2. **Entorno**: Sistema operativo, navegador, versión del proyecto
3. **Pasos para reproducir**: Lista numerada de acciones
4. **Comportamiento esperado**: Lo que debería ocurrir
5. **Comportamiento actual**: Lo que ocurre en realidad
6. **Capturas de pantalla**: Si es posible
7. **Información adicional**: Logs, configuración especial, etc.

## Propuesta de Funcionalidades

Para proponer una nueva funcionalidad:

1. Verifica que no exista ya una propuesta similar.
2. Crea un issue con la etiqueta "enhancement".
3. Proporciona un caso de uso claro y los beneficios esperados.
4. Si es posible, incluye wireframes o diagramas.
5. Considera la arquitectura actual y cómo se integraría tu propuesta.

---

Estas pautas están diseñadas para hacer que el proceso de contribución sea claro y efectivo. No dudes en proponer mejoras a estas guías mediante un PR.

¡Gracias por contribuir a Colmena!
