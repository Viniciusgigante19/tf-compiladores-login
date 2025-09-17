import React from 'react';
import Login from './components/login/login';
import { useState, useEffect } from 'react';

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token)
  },[])

  return (
    <div>
        {authenticated? <Home/>: <Login onLogin={() => setAuthenticated(true)}/>}
    </div>
  )
}

export default App;
