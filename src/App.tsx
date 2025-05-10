import React from 'react';
import { Route, Routes, Navigate } from 'react-router';
import LoginPage from './components/LoginPage/LoginPage';
import AuthCallbackPage from './components/AuthCallbackPage/AuthCallbackPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import DashboardPage from './components/DashboardPage/DashboardPage';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthCallbackPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
