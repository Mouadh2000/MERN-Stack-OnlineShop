import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const ProtectedRoute = ({ element, requiresAuth }) => {
  const { isLoggedIn } = useAuth();

  if (requiresAuth && !isLoggedIn) {
    // Redirect to sign-in if not logged in and authentication is required
    return <Navigate to="/sign-in" />;
  }

  return element;
};

export default ProtectedRoute;
