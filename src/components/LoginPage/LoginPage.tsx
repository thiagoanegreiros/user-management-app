import React from 'react';
import { getLoginRedirectUrl } from '../../utils/auth';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    window.location.href = getLoginRedirectUrl();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Management App</h1>
        <p className="text-gray-600 mb-8">
          Manage your users easily. Please login with your Google account:
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
