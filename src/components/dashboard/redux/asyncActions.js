import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../../../config/fbconfig";

export const createNewUserNotificationAsync = createAsyncThunk(
  "counter/createNewUserNotificationAsync",
  async (user, { rejectWithValue }) => {
    try {
      const newNotification = {
        user: user,
        content: "joined the party.",
        createdDate: new Date(),
      };

      await addDoc(collection(db, "notifications"), newNotification);

      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTodoNotificationAsync = createAsyncThunk(
  "counter/createTodoNotificationAsync",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const user = state.auth.authenticatedUser;

      const newNotification = {
        user: `${user.firstName} ${user.lastName}`,
        content: `${payload.action} ${payload.title}.`,
        createdDate: new Date(),
      };

      await addDoc(collection(db, "notifications"), newNotification);
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
