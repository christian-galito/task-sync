import { createSlice } from "@reduxjs/toolkit";
import {
  signInAsync,
  signUpAsync,
  getAuthenticatedUserAsync,
} from "./asyncActions";

const initialState = {
  authenticated: false,
  authenticatedUser: null,
  errorMessage: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
      return state;
    },
    setAuthenticatedUser: (state, action) => {
      state.authenticatedUser = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.rejected, (state, action) => {
        state.errorMessage = action.payload;
        return state;
      })
      .addCase(signInAsync.fulfilled, (state) => {
        state.errorMessage = "";
        return state;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.errorMessage = "";
        return state;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.errorMessage = action.payload;
        return state;
      })
      .addCase(getAuthenticatedUserAsync.fulfilled, (state, action) => {
        state.authenticatedUser = action.payload;
        return state;
      });
  },
});

export const { setAuthenticated, setAuthenticatedUser } = AuthSlice.actions;

export default AuthSlice.reducer;
