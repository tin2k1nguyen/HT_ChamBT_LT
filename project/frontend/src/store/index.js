import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userReducer, { currentUser } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
