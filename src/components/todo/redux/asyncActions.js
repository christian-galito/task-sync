import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../config/fbconfig";

export const createTodoAsync = createAsyncThunk(
  "counter/createTodoAsync",
  async (todo, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.authenticatedUser;

    const newTodo = {
      ...todo,
      createdByFirstName: user.firstName,
      createdByLastName: user.lastName,
      createdByUserId: user.userId,
      createdDate: new Date(),
    };
    console.log("create", newTodo);

    return addDoc(collection(db, "todos"), newTodo)
      .then((docRef) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        thunkAPI.rejectWithValue(error.message);
      });
  }
);

export const updateTodoAsync = createAsyncThunk(
  "counter/updateTodoAsync",
  async (payload, { rejectWithValue, getState }) => {
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
      return payload;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "counter/deleteTodoAsync",
  async (todoId, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "todos", todoId);
      await deleteDoc(docRef);
      return todoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
