import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "apps/authenticated-front/src/app/models/user";
import { STATES } from "mongoose";

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
};

export const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
});

export const { setUser, setToken, setRefreshToken } = authSlide.actions;

export default authSlide.reducer;
