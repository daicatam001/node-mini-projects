import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, IUser } from "apps/authenticated-front/src/app/models";

export type AuthState = IAuth;
export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refresh-token";
const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
};

export const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
      updatelocalStorageValue(TOKEN_KEY, action.payload);
    },
    setRefreshToken: (state: AuthState, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      updatelocalStorageValue(REFRESH_TOKEN_KEY, action.payload);
    },
    setAuth: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
      state.user = action.payload.user;

      updatelocalStorageValue(TOKEN_KEY, action.payload.token || "");
      updatelocalStorageValue(
        REFRESH_TOKEN_KEY,
        action.payload.refreshToken || ""
      );
    },
    initTokens(state: AuthState) {
      state.token = localStorage.getItem(TOKEN_KEY);
      state.refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    },
  },
});

const updatelocalStorageValue = (key: string, value: string) => {
  value ? localStorage.setItem(key, value) : localStorage.removeItem(key);
};

export const { setUser, setToken, setRefreshToken, setAuth, initTokens } =
  authSlide.actions;

export const selectIsAuth = ({ auth }: { auth: AuthState }) => !!auth.user;
export const selectToken = ({ auth }: { auth: AuthState }) => auth.token;
export const selectHasTokens = ({ auth }: { auth: AuthState }) =>
  !!auth.token && !!auth.refreshToken;
export default authSlide.reducer;
