import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth'

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('token');
    const refreshToken = urlParams.get('refresh_token');

    if (accessToken && refreshToken) {
      login(accessToken, refreshToken);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate, location.search, login]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Processing authentication...</h1>
    </div>
  );
};

export default AuthCallbackPage;
