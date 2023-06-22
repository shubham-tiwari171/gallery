import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/atoms/Register/Register';
import Login from './components/atoms/Login/Login';
import { Pages } from './components/Pages/Pages';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from './redux/reducers/reducers';

function App() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for login timeout
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, location.pathname, navigate]);

  useEffect(() => {
    // Check for logout
    if (!user && isLoggedIn) {
      dispatch(logout()); // Dispatch the logout action to update the isLoggedIn state
      navigate('/login');
    }
  }, [user, isLoggedIn, navigate, dispatch]);

  return (
    <div className="App">
      <Routes>
        {isLoggedIn === false && <Route path="/" element={<Pages />} />}
        <Route path="/" element={isLoggedIn ? <Pages /> : <Login />} />
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
