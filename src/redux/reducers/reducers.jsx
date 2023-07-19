import { createSlice } from "@reduxjs/toolkit";

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

const imageSearchSlice = createSlice({
  name: "search",
  initialState: {
    searchedText: "",
    // searchedData: [],
  },
  reducers: {
    search: (state, action) => {
      state.searchedText = action.payload;
      // state.searchedData = action.payload;
    },
  },
});

export const { login, setUser, logout } = userSlice.actions;
export const { search } = imageSearchSlice.actions;
export const userSliceReducer = userSlice.reducer;
export const imageSearchSliceReducer = imageSearchSlice.reducer;
