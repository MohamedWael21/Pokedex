import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/types";

const initialState: AppTypeInitialState = {
  toasts: [],
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { setToast, clearToasts } = AppSlice.actions;
