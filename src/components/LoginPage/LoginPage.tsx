// src/components/LoginPage/LoginPage.tsx
import React from 'react';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    // Coloque a URL da sua API que inicia o fluxo de OAuth2
    window.location.href = 'https://python-studies.onrender.com/login';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>User Management App</h1>
      <p>Manage your users easily. Please login with your Google account:</p>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
