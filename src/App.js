import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/atoms/Register/Register';
import Login from './components/atoms/Login/Login';
import { Pages } from './components/Pages/Pages';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

function App() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();
  console.log(isLoggedIn)
  const navigate = useNavigate();

  useEffect(() => {
    // logout quickely
    if (Object.keys(user).length === 0 && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
    //check for login 
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== "/register") {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pages />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
