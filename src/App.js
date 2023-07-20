import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/atoms/Register/Register';
import Login from './components/atoms/Login/Login';
import { Pages } from './components/Pages/Pages';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Explore from './components/atoms/Explore/Explore';
import Header from './components/atoms/Header/Header';
function App() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 40000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div className="App">
      {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
      <Routes>
        {isLoggedIn === false && <Route path="/" element={<Pages />} />}
        <Route path="/" element={isLoggedIn ? <Pages /> : <Login />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
}

export default App;
