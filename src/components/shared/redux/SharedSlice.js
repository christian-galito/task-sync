import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackBar: {
    open: false,
    message: "",
    type: "success",
  },
  confirmModal: {
    open: false,
    message: "",
    onClose: null,
    onConfirm: null,
  },
};

const AuthSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setSnackBar: (state, action) => {
      state.snackBar = action.payload;
      return state;
    },
    setConfirmModal: (state, action) => {
      state.confirmModal = action.payload;
      return state;
    },
  },
});

export const { setSnackBar, setConfirmModal } = AuthSlice.actions;

export default AuthSlice.reducer;
