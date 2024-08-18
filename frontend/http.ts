import axios from "axios";
import config from "./config";
import { useUserStore } from "./stores/userStore";

const instance = axios.create({ baseURL: config.backEndUrl });

instance.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.isLoggedIn) {
    config.headers["Authorization"] = userStore.token;
  }
  config.headers["Accept"]='application/json'
  return config;
}, (error) => {
  return Promise.reject(error);
})

instance.interceptors.response.use((response) => {
  return response;
}, error => {
  return Promise.reject(error)
})

export default instance