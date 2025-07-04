import axios from "axios";
import { Environment } from "../environment";

const api = axios.create({
  baseURL: Environment.URL_BASE, // porta do seu backend
});

export default api;
export * from "./axios";
export * from "./api";