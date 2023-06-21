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
      state.user = action.payload;
      //localStorage.setItem("user", JSON.stringify(action.payload));
    },

    login: (state, action) => {
      state.isLoggedIn = true;
    },
  },
});
export const { login, setUser } = userSlice.actions;
export default userSlice.reducer;
