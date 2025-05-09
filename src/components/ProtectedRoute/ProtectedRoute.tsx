import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { JSX } from 'react/jsx-runtime';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};


export default ProtectedRoute;
