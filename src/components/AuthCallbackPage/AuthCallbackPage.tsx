import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('access_token', token);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate, location.search]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Processing authentication...</h1>
    </div>
  );
};

export default AuthCallbackPage;
