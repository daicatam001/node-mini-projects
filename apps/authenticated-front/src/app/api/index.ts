import {
  IAuth,
  IUser,
  UserSignUp,
  IBaseResponse,
} from "apps/authenticated-front/src/app/models";
import { selectToken } from "apps/authenticated-front/src/app/state/authSlide";
import { store } from "apps/authenticated-front/src/app/store";
import { environment } from "apps/authenticated-front/src/environments/environment.prod";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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
api.interceptors.response.use(function <T>(
  response: AxiosResponse<IBaseResponse<T>>
) {
  return { ...response, data: response.data.data };
});

export const signUp = (params: UserSignUp): Promise<IBaseResponse<IAuth>> => {
  return api.post("/sign-up", params);
};

export const findAuth = (): Promise<IBaseResponse<IUser>> => {
  return api.get("/auth");
};
export default api;
