import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios"
import type { CreateBlog, SignInByGooglePayload } from "./types/types";
import { UserEndPoint } from "./constant";
const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    timeout: 10*1000,
});

api.interceptors.request.use( (config: InternalAxiosRequestConfig<any>):InternalAxiosRequestConfig<any> => {
    const token = localStorage.getItem('token');
    if(token)
        config.headers.Authorization = `Bearer ${token}`;
    return config
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("token");
        if(window.location.pathname  !== "/")
            window.location.href = "/"
    }
    return Promise.reject(error);
  }
)

export const signInByGoogle = async (payload: SignInByGooglePayload) => {
    const res = await api.post(payload.endpoint, payload.data);
    return res;
}

export const getProfile = async (endpoint: string) => {
    const res = await api.get(endpoint);
    return res;
}

export const createBlog = async (payload: CreateBlog) => {
    const res = await api.post(UserEndPoint.createBlogEndpoint, payload);
    return res;
}

