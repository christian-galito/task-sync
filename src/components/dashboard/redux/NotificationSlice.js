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
        return state;
      },
      createNewUserNotificationAsync.fulfilled,
      (state, action) => {
        return state;
      }
    );
  },
});

export const { setNotifications } = NotificationSlice.actions;

export default NotificationSlice.reducer;
