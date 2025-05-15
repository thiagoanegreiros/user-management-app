import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import MoviesList from '../MoviesList/MoviesList';
import { UsersPage } from '../UsersPage/UsersPage';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const dashLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 py-12 px-4 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10">
        <div className="flex flex-wrap gap-2 items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">🎬 User Management App</h1>
            <p className="text-gray-500 dark:text-gray-300 mt-1">Welcome, you are logged in!</p>
          </div>
          <ThemeToggle />
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={dashLogout}
          >
            Logout
          </button>
        </div>

        <div>
          <UsersPage />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Popular Movies
          </h2>
          <MoviesList />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
