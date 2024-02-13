import { createSlice } from "@reduxjs/toolkit";

interface initialState {
 userInfo: {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
 } | null;
}

const initialState: initialState = {
 userInfo: localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") || "")
  : null,
};

const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers: {
  setCredentians: (state, action) => {
   state.userInfo = action.payload;
   localStorage.setItem("userInfo", JSON.stringify(action.payload));
  },
  logout: (state) => {
   state.userInfo = null;
   localStorage.removeItem("userInfo");
  },
 },
});

export const { setCredentians, logout } = authSlice.actions;

export default authSlice.reducer;
