import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/reducers";
import { setUser } from "../reducers/reducers";
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

store.subscribe(() => {
  const userState = store.getState().user;
  if (userState.user && userState.isLoggedIn) {
    localStorage.setItem("user", JSON.stringify(userState.user));
    // localStorage.setItem("isLoggedIn", JSON.stringify(userState.isLoggedIn));
  } else {
    localStorage.removeItem("user");
    // localStorage.removeItem("isLoggedIn");
  }
});

const storedUserData = localStorage.getItem("user");
if (storedUserData) {
  store.dispatch(setUser(JSON.parse(storedUserData)));
}
