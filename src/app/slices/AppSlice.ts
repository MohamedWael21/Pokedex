import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/types";

const initialState: AppTypeInitialState = {
  toasts: [],
  userInfo: undefined,
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
    setUserStatus: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setToast, clearToasts, setUserStatus } = AppSlice.actions;
