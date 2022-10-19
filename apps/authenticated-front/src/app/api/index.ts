import {
  IAuth,
  IUser,
  UserSignUp,
  IBaseResponse,
} from "apps/authenticated-front/src/app/models";
import { selectToken } from "apps/authenticated-front/src/app/state/authSlide";
import { store } from "apps/authenticated-front/src/app/store";
import { environment } from "apps/authenticated-front/src/environments/environment.prod";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: environment.serverUrl,
});
api.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = selectToken(store.getState());
  if (config.headers && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  function <T>(response: AxiosResponse<IBaseResponse<T>>) {
    return { ...response, data: response.data.data };
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log(error.config, error.request);
      try {
        await refreshToken();
      } catch (e) {}
      return Promise.resolve(api.request(error.config as AxiosRequestConfig));
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
export const refreshToken = (): Promise<IBaseResponse<IUser>> => {
  return api.post("/refresh-token");
};
export default api;
