import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./components/atoms/Register/Register";
import Login from "./components/atoms/Login/Login";
import { Pages } from "./components/Pages/Pages";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Explore from "./components/atoms/Explore/Explore";
import Header from "./components/atoms/Header/Header";
import SavedImagesShow from "./components/atoms/SavedImagesShow/SavedImagesShow";
import UploadForm from "./components/atoms/UploadForm/Uploadform";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/reducers/reducers";
import { getUserLoggedIn } from "../src/context/firebase";

function App() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          if (authUser.providerData[0].providerId === "google.com") {
            const loggedInUser = await getUserLoggedIn(authUser?.email);
            dispatch(setUser(loggedInUser));
          }
          if (authUser.providerData.providerId === "password") {
            const loggedInUser = await getUserLoggedIn(authUser?.email);
            dispatch(setUser(loggedInUser));
          }
        } catch (error) {
          signOut(auth);
        }
      } else {
        // If there's no authenticated user, navigate to the login page
        if (authUser === null && location.pathname !== "/login" && location.pathname !== "/register") {
          const timer = setTimeout(() => {
            navigate("/login");
          }, 30000);
          return () => clearTimeout(timer);
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, location.pathname, navigate]);

  return (
    <div className="App">
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Header />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Pages />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route
          exact
          path="/savedImages/:name/:id"
          element={<SavedImagesShow />}
        />
        <Route exact path="/uploadform" element={<UploadForm />} />
      </Routes>
    </div>
  );
}

export default App;
