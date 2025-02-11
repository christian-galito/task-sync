import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../../components/auth/redux/AuthSlice";
import NotificationSlice from "../../components/dashboard/redux/NotificationSlice";
import TodoSlice from "../../components/todo/redux/TodoSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    todos: TodoSlice,
    notifications: NotificationSlice,
  },
});

export default store;
