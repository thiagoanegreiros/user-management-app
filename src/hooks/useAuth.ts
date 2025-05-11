import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, []);

  const login = (token: string, refresh_token: string ) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refresh_token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, isLoading, login, logout };
};
