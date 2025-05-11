import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import MoviesList from '../MoviesList/MoviesList';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const dashLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-200 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🎬 User Management App</h1>
            <p className="text-gray-500 mt-1">Welcome, you are logged in!</p>
          </div>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={dashLogout}
          >
            Logout
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Popular Movies</h2>
          <MoviesList />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
