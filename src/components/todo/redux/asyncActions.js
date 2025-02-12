import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../config/fbconfig";
import { setSnackBar } from "../../shared/redux/SharedSlice";

export const createTodoAsync = createAsyncThunk(
  "counter/createTodoAsync",
  async (todo, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const user = state.auth.authenticatedUser;

    try {
      const newTodo = {
        ...todo,
        createdByFirstName: user.firstName,
        createdByLastName: user.lastName,
        createdByUserId: user.userId,
        createdDate: new Date(),
      };

      await addDoc(collection(db, "todos"), newTodo);
      dispatch(
        setSnackBar({
          open: true,
          message: "Successfully added a new task!",
          type: "success",
        })
      );

      return true;
    } catch (error) {
      dispatch(
        setSnackBar({
          open: true,
          message: error.message ?? "Something went wrong",
          type: "error",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "counter/updateTodoAsync",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const user = state.auth.authenticatedUser;
    try {
      const docRef = doc(db, "todos", payload.todoId);

      await updateDoc(docRef, {
        title: payload.title,
        category: payload.category,
        content: payload.content,
        lastUpdatedByFirstName: user.firstName,
        lastUpdatedByLastName: user.lastName,
        lastUpdatedDate: new Date(),
      });

      dispatch(
        setSnackBar({
          open: true,
          message: "Successfully updated task!",
          type: "success",
        })
      );

      return true;
    } catch (error) {
      dispatch(
        setSnackBar({
          open: true,
          message: error.message ?? "Something went wrong",
          type: "error",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "counter/deleteTodoAsync",
  async (todoId, { rejectWithValue, dispatch }) => {
    try {
      const docRef = doc(db, "todos", todoId);
      await deleteDoc(docRef);

      dispatch(
        setSnackBar({
          open: true,
          message: "Successfully deleted task!",
          type: "success",
        })
      );

      return todoId;
    } catch (error) {
      dispatch(
        setSnackBar({
          open: true,
          message: error.message ?? "Something went wrong",
          type: "error",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);
