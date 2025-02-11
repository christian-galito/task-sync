import { createAsyncThunk } from "@reduxjs/toolkit";

import { collection, addDoc } from "firebase/firestore";

import { db } from "../../../config/fbconfig";

export const createNewUserNotificationAsync = createAsyncThunk(
  "counter/createNewUserNotificationAsync",
  async (user) => {
    const newNotification = {
      user: user,
      content: "joined the party.",
      createdDate: new Date(),
    };

    return addDoc(collection(db, "notifications"), newNotification)
      .then((docRef) => {
        return true;
      })
      .catch((err) => console.log("Error: ", err));
  }
);

export const createTodoNotificationAsync = createAsyncThunk(
  "counter/createTodoNotificationAsync",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();

    const user = state.auth.authenticatedUser;

    const newNotification = {
      user: `${user.firstName} ${user.lastName}`,
      content: `${payload.action} ${payload.title}.`,
      createdDate: new Date(),
    };

    return addDoc(collection(db, "notifications"), newNotification)
      .then((docRef) => {
        return true;
      })
      .catch((err) => console.log("Error: ", err));
  }
);
