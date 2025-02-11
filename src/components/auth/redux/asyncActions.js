import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { auth, db } from "../../../config/fbconfig";
import { signOut } from "firebase/auth";

export const signInAsync = createAsyncThunk(
  "counter/signInAsync",
  async (cred) => {
    return signInWithEmailAndPassword(auth, cred.email, cred.password)
      .then(() => cred.navigate("/home"))
      .catch((err) => console.log("Error: ", err));
  }
);

export const signUpAsync = createAsyncThunk(
  "counter/signUpAsync",
  async (cred) => {
    return createUserWithEmailAndPassword(auth, cred.email, cred.password)
      .then((userCredential) => {
        const user = userCredential.user;

        const userValues = {
          firstName: cred.firstName,
          lastName: cred.lastName,
          email: cred.email,
          createdDate: new Date(),
        };

        return setDoc(doc(db, "users", user.uid), userValues).then(() =>
          cred.navigate("/home")
        );
      })
      .catch((err) => console.log("Error: ", err));
  }
);

export const signOutAsync = createAsyncThunk(
  "counter/signOutAsync",
  async () => {
    await signOut(auth).catch((err) => console.log("Error: ", err));
  }
);

export const getAuthenticatedUserAsync = createAsyncThunk(
  "counter/getAuthenticatedUserAsync",
  async (uid) => {
    return getDoc(doc(db, "users", uid))
      .then((userDoc) => {
        return {
          ...userDoc.data(),
          userId: userDoc.id,
          createdDate: userDoc.data().createdDate.toDate().toISOString(),
        };
      })
      .catch((err) => console.log("Error: ", err));
  }
);
