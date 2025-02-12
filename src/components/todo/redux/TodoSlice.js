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
        return state;
      })
      .addCase(createTodoAsync.rejected, (state, action) => {
        return state;
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        return state;
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        return state;
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        return state;
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        return state;
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.error = action.payload;
        return state;
      });
  },
});

export const { setTodos, setSelectedTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
