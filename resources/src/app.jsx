import React from 'react';
import Login from './components/login/login';
import Home from './components/home/home'
import { useState, useEffect } from 'react';

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token)
  },[])
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false)
  }

  return (
    <div>
        {authenticated? <Home onLogout={handleLogout}/>: <Login onLogin={() => setAuthenticated(true)}/>}
    </div>
  )
}

export default App;
