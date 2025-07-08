import axios from "axios";
import { Environment } from "../environment";

const api = axios.create({
  baseURL: Environment.URL_BASE, // porta do seu backend
});

// Antes de cada request, adiciona token se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
export * from "./axios";
export * from "./api";