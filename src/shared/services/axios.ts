import axios from "axios";
import { Environment } from "../environment";

const api = axios.create({
  baseURL: Environment.URL_BASE, // porta do seu backend
});

//adiciona token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
export * from "./axios";
export * from "./api";