import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../../components/auth/redux/AuthSlice";
import NotificationSlice from "../../components/dashboard/redux/NotificationSlice";
import SharedSlice from "../../components/shared/redux/SharedSlice";
import TodoSlice from "../../components/todo/redux/TodoSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    notifications: NotificationSlice,
    shared: SharedSlice,
    todos: TodoSlice,
  },
});

export default store;
