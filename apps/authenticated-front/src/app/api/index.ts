import {
  IAuth,
  IUser,
  UserSignUp,
  IBaseResponse,
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

export const signUp = (params: UserSignUp): Promise<IBaseResponse<IAuth>> => {
  return api.post("/sign-up", params);
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
