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
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-200">
      <div className="text-center text-gray-700">
        <h1 className="text-4xl font-bold">User Management App</h1>
        <p className="text-lg">Welcome, you are logged in!</p>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={dashLogout}>Logout</button>
        <MoviesList />
        </div>
      </div>
    );
};

export default LoginPage;
