// src/components/AuthCallbackPage/AuthCallbackPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('access_token', token);
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Processing authentication...</h1>
    </div>
  );
};

export default AuthCallbackPage;
