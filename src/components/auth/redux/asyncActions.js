import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { auth, db } from "../../../config/fbconfig";
import { setSnackBar } from "../../shared/redux/SharedSlice";

export const signInAsync = createAsyncThunk(
  "counter/signInAsync",
  async (cred, { dispatch, rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, cred.email, cred.password);

      dispatch(
        setSnackBar({
          open: true,
          message: "Signed in successfully!",
          type: "success",
        })
      );
      cred.navigate("/home");
    } catch (error) {
      if (error.message.includes("auth/invalid-credential")) {
        return rejectWithValue("Incorrect Email/Password");
      }

      return rejectWithValue(error.message);
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "counter/signUpAsync",
  async (cred, { dispatch, rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cred.email,
        cred.password
      );

      const user = userCredential.user;
      const userValues = {
        firstName: cred.firstName,
        lastName: cred.lastName,
        email: cred.email,
        createdDate: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), userValues);

      dispatch(
        setSnackBar({
          open: true,
          message: `Welcome ${userValues.firstName} ${userValues.lastName}`,
          type: "success",
        })
      );
      cred.navigate("/home");

      return userValues;
    } catch (error) {
      if (error.message.includes("auth/email-already-in-use")) {
        return rejectWithValue("Email is already in use");
      }

      return rejectWithValue(error.message);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "counter/signOutAsync",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAuthenticatedUserAsync = createAsyncThunk(
  "counter/getAuthenticatedUserAsync",
  async (uid, { rejectWithValue }) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));

      return {
        ...userDoc.data(),
        userId: userDoc.id,
        createdDate: userDoc.data().createdDate.toDate().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
