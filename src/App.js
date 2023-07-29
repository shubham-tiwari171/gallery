import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/atoms/Register/Register';
import Login from './components/atoms/Login/Login';
import { Pages } from './components/Pages/Pages';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Explore from './components/atoms/Explore/Explore';
import Header from './components/atoms/Header/Header';
import SavedImagesShow from './components/atoms/SavedImagesShow/SavedImagesShow';
import UploadForm from './components/atoms/UploadForm/Uploadform';

function App() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 30000);
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
        <Route exact path="/savedImages/:name/:id" element={<SavedImagesShow />} />
        <Route exact path="/uploadform" element={<UploadForm />} />
      </Routes>
    </div>
  );
}

export default App;
