import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: {
    name: "",
  },
};

const AuthSlice = createSlice({
  name: "AuthCheck",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload; 
    },
    setUserInfo: (state, action) => {
      state.userInfo.name = action.payload;
    },
  },
});
export const {setIsAuthenticated,setUserInfo } = AuthSlice.actions;
export default AuthSlice.reducer;
