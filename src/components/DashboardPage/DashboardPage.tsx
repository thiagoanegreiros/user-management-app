import React from 'react';
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router';
import MoviesList from '../MoviesList/MoviesList';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth()
  const dashLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>User Management App</h1>
      <p>This is the dashboard</p>
      <h1>Welcome, you are logged in!</h1>
      <button onClick={dashLogout}>Logout</button>
      <MoviesList />
    </div>
  );
};

export default LoginPage;
