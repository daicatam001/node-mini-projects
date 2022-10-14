import { environment } from "apps/authenticated-front/src/environments/environment.prod";
import axios from "axios";

const api = axios.create({
  baseURL: environment.serverUrl,
});

export default api;
