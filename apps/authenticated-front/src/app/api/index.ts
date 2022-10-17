import { IBaseResponse } from "apps/authenticated-front/src/app/models/common";
import {
  IAuth,
  UserSignUp,
} from "apps/authenticated-front/src/app/models/user";
import { environment } from "apps/authenticated-front/src/environments/environment.prod";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: environment.serverUrl,
});

api.interceptors.response.use(function <T>(
  response: AxiosResponse<IBaseResponse<T>>
) {
  return { ...response, data: response.data.data };
});

export const signUp = (params: UserSignUp): Promise<IBaseResponse<IAuth>> => {
  return api.post("/sign-up", params);
};

export default api;
