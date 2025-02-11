import { createSlice } from "@reduxjs/toolkit";
import {
  createTodoAsync,
  deleteTodoAsync,
  updateTodoAsync,
} from "./asyncActions";

const initialState = {
  selectedTodo: null,
  todos: [],
  reset: true,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        console.log("Successfully added todo.", action.payload);
      })
      .addCase(createTodoAsync.rejected, (state, action) => {
        console.log("create rejected", action.payload);
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        console.log("Successfully updated todo.", action.payload);
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        console.log("update rejected", action.payload);
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        console.log("delete pending");
        state.loading = true;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        console.log("delete fulfilled");
        state.loading = false;
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        console.log("delete rejected", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTodos, setSelectedTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
