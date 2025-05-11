import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('token');
    const refreshToken = urlParams.get('refresh_token');

    if (accessToken && refreshToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
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
