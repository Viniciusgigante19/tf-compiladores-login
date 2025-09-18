import React, { useState, useEffect } from 'react';
import Login from './components/login/login';
import Home from './components/home/home';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      setAuthenticated(Date.now() < decoded.exp * 1000);
    } catch {
      setAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <div>
      {authenticated ? <Home onLogout={handleLogout} /> : <Login onLogin={() => setAuthenticated(true)} />}
    </div>
  );
};

export default App;
