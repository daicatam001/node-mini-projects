import {
  IAuth,
  IUser,
  IUserSignUp,
  IBaseResponse,
  IUserLogin,
} from "apps/authenticated-front/src/app/models";
import {
  selectRefreshToken,
  selectToken,
  setAuth,
  setToken,
} from "apps/authenticated-front/src/app/state/authSlide";
import { store } from "apps/authenticated-front/src/app/store";
import { environment } from "apps/authenticated-front/src/environments/environment.prod";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: environment.serverUrl,
});
api.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = selectToken(store.getState());
  console.log(config.headers);
  try {
    if (config.headers && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (e) {}
  return config;
});
api.interceptors.response.use(
  function <T>(response: AxiosResponse<IBaseResponse<T>>) {
    return { ...response, data: response.data.data };
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const token = selectToken(store.getState());
        const refreshToken = selectRefreshToken(store.getState());
        const { data } = await refreshNewToken(token || "", refreshToken || "");
        store.dispatch(setToken(data));
        if (error.config) {
          return api.request({ ...error.config, headers: { retry: true } });
        }
      } catch (e) {
        store.dispatch(setAuth({}));
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const signUp = (params: IUserSignUp): Promise<IBaseResponse<IAuth>> => {
  return api.post("/sign-up", params);
};

export const login = (params: IUserLogin): Promise<IBaseResponse<IAuth>> => {
  return api.post("/login", params);
};

export const findAuth = (): Promise<IBaseResponse<IUser>> => {
  return api.get("/auth");
};
export const refreshNewToken = (
  token: string,
  refreshToken: string
): Promise<IBaseResponse<string>> => {
  return api.post("/refresh-token", { token, refreshToken });
};
export default api;

export const resetPassword = (
  email: string
): Promise<IBaseResponse<{ resetPasswordToken: string }>> => {
  return api.post("/reset-password", { email });
};

export const getResetPasswordTokenStatus = (
  token: string
): Promise<IBaseResponse<{ status: string }>> => {
  return api.get(`/reset-password/${token}/status`);
};

export const changePassword = (password: string, token: string) => {
  return api.post("/change-password", { password, token });
};

export const updateProfile = (data: Pick<IUser, "name" | "description">) => {
  return api.put("/user", data);
};

export const logout = () => {
  localStorage.clear();
};
