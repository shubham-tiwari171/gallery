import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/atoms/Register/Register';
import Login from './components/atoms/Login/Login';
import { Pages } from './components/Pages/Pages';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  console.log(isLoggedIn)
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/login');
    }
    if (!isLoggedIn) {
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
