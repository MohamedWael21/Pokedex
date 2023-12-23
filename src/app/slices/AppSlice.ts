import { createSlice } from "@reduxjs/toolkit";
import { AppTypeInitialState } from "../../utils/types";
import { POKEMON_TABS } from "../../utils/constants";

const initialState: AppTypeInitialState = {
  toasts: [],
  userInfo: undefined,
  currentPokemonTab: POKEMON_TABS.description,
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
    setPokemonTab: (state, action) => {
      state.currentPokemonTab = action.payload;
    },
  },
});

export const { setToast, clearToasts, setUserStatus, setPokemonTab } =
  AppSlice.actions;
