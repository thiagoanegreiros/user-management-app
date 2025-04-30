import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import LoginPage from './components/LoginPage/LoginPage';
import AuthCallbackPage from './components/AuthCallbackPage/AuthCallbackPage';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Routes>
        <Route path="/auth" element={<AuthCallbackPage />} />
        <Route path="/" element={
          isLoggedIn ? (
            <>
              <h1>Welcome, you are logged in!</h1>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
