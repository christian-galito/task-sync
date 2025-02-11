import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavigationBar from "./components/navigation/NavigationBar";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

import { useAuth } from "./config/AuthContext";
import {
  setAuthenticated,
  setAuthenticatedUser,
} from "./components/auth/redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/shared/ProtectedRoute/ProtectedRoute";
import { getAuthenticatedUserAsync } from "./components/auth/redux/asyncActions";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2), // Default padding
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0.5), // Smaller padding for small screens
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
        <Route path="/signin" Component={SignIn} />
        <Route path="/signup" Component={SignUp} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
