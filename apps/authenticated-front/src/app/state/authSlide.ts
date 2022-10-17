import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, IUser } from "apps/authenticated-front/src/app/models";

export type AuthState = IAuth;
const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
};

export const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    initAuth: (state, action: PayloadAction<AuthState>) => {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { setUser, setToken, setRefreshToken, initAuth } =
  authSlide.actions;

export default authSlide.reducer;
