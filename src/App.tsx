// src/App.tsx
import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {isLoggedIn ? (
        <>
          <h1>Welcome, you are logged in!</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
