import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  roles: [],
  isAuthorized: localStorage.getItem("compileTokenApp") || false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthorized = true;
    },
    logout: (state) => {
      state.isAuthorized = false;
    },
    setUserInfo: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
      state.isAuthorized = state.isAuthorized;
    },
  },
});

export const userAction = userSlice.actions;

export const selectUser = ({ user }) => user;

export default userSlice.reducer;
