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
  if (userState.user) {
    localStorage.setItem("user", JSON.stringify(userState.user));
  } else {
    localStorage.removeItem("user");
  }
});

const storedUserData = localStorage.getItem("user");
if (storedUserData) {
  store.dispatch(setUser(JSON.parse(storedUserData)));
}
