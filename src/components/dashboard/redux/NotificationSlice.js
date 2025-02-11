import { createSlice } from "@reduxjs/toolkit";
import {
  createTodoNotificationAsync,
  createNewUserNotificationAsync,
} from "./asyncActions";

const initialState = {
  notifications: [],
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createTodoNotificationAsync.fulfilled,
      (state, action) => {
        console.log("Successfully added todo notification.", action.payload);
      },
      createNewUserNotificationAsync.fulfilled,
      (state, action) => {
        console.log("Successfully added user notification.", action.payload);
      }
    );
  },
});

export const { setNotifications } = NotificationSlice.actions;

export default NotificationSlice.reducer;
