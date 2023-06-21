import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },

    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});
export const { login, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
