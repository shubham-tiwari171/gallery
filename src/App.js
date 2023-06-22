import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/atoms/Register/Register';
import Login from './components/atoms/Login/Login';
import { Pages } from './components/Pages/Pages';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function App() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  console.log(isLoggedIn)
  const location = useLocation();
  const navigate = useNavigate();


  // useEffect(() => {
  //   // Check for logout
  //   if (Object.keys(user).length === 0 && location.pathname !== '/login' && location.pathname !== '/register') {
  //     navigate('/');
  //   }
  // }, [user, location.pathname, navigate]);

  useEffect(() => {
    // Check for login timeout

    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/" element={isLoggedIn ? <Pages /> : <Login />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
