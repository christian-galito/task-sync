import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";

import NavigationBar from "./components/navigation/NavigationBar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ErrorPage from "./components/errorPage/ErrorPage";
import ProtectedRoute from "./components/shared/ProtectedRoute/ProtectedRoute";
import { getAuthenticatedUserAsync } from "./components/auth/redux/asyncActions";
import {
  setAuthenticated,
  setAuthenticatedUser,
} from "./components/auth/redux/AuthSlice";

import "./App.css";
import { useAuth } from "./config/AuthContext";

import { ConfirmDialog, SnackBar } from "./components/shared";

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2),
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0.5),
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: ({ theme }) => ({
          backgroundColor: theme.palette.button.main,
          fontWeight: "bold",
          textTransform: "uppercase",
          padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
          borderRadius: `${theme.spacing(1)}`,
          color: "white",
        }),
        text: {
          fontWeight: "bold",
        },
      },
    },
  },
  palette: {
    primary: { main: "#5C7285", contrastText: "#fff" },
    secondary: { main: "#A7B49E", contrastText: "#fff" },
    category1: { main: "#A9B5DF", dark: "#767f9c" },
    category2: { main: "#81BFDA", dark: "#4B7080", light: "#92DCFC" },
    category3: { main: "#C8AAAA", dark: "#877070" },
    category4: { main: "#A6CDC6", dark: "#6C8783" },
    text: { main: "#800020" },
    card: { main: "#E2E0C8" },
    details: { main: "#DCD7C9" },
    button: { main: "#854836" },
    default: { main: "#D3D3D3" },
  },
  typography: {
    caption: {
      fontSize: "0.6rem",
      fontWeight: 400,
      color: "#8D8D8w",
      letterSpacing: "0.01em",
    },
  },
});

function App() {
  const { user, loading } = useAuth();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getAuthenticatedUserAsync(user.uid));
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setAuthenticated(false));
      dispatch(setAuthenticatedUser(null));
    }
  }, [user, loading, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar authenticated={authenticated} />
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" Component={SignIn} />
        <Route path="/signin" Component={SignIn} />
        <Route path="/signup" Component={SignUp} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <SnackBar />
      <ConfirmDialog />
    </ThemeProvider>
  );
}

export default App;
