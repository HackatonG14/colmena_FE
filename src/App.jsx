import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { get_category } from './store/reducers/homeReducer';
import { useDispatch } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import { publicRoutes, protectedRoutes } from './routes/index.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_category());
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        {/* Rutas públicas */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* Rutas protegidas */}
        {protectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children?.map((child, childIndex) => (
              <Route
                key={childIndex}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </MainLayout>
  );
}

export default App;
