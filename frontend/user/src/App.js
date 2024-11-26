import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OffcanvasMenu from './components/layout/OffcanvasMenu';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import routes from './routes';
import ProtectedRoute from './context/ProtectedRoute';
import { CartProvider } from './context/CartContext'; // Import the CartProvider

function App() {
  return (
    <>
    <CartProvider>
      <OffcanvasMenu />
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute
                element={route.element}
                requiresAuth={route.requiresAuth}
              />
            }
          />
        ))}
      </Routes>
      <Footer />
    </CartProvider>
    </>
  );
}

export default App;
