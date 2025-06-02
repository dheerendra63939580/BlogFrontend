import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios"
import type { CreateBlog, LoginPayloadType, RegisterUser, SignInByGooglePayload, UpdateBlogPayload } from "./types/types";
import { UserEndPoint } from "./constant";
const api = axios.create({
    baseURL: "https://blogbackend-njk4.onrender.com/api/v1",
    timeout: 100*1000,
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
        else
            window.location.reload()
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
    const res = await api.post(UserEndPoint.blogEndpoint, payload);
    return res;
}

export const getAllBlogs = async () => {
    const res = await api.get(UserEndPoint.blogEndpoint);
    return res.data;
}

export const getBlogById = async (blogId: string, wantOnlyUserId?: boolean) => {
    const res = await api.get(`${UserEndPoint.blogEndpoint}/${blogId}/${wantOnlyUserId}`);
    return res.data
}

export const updateBlog = async (blogUpdatePayload: UpdateBlogPayload) => {
    const res = await api.patch(UserEndPoint.blogEndpoint, blogUpdatePayload);
    return res.data;
}

export const handleLike = async (blogId: string) => {
    const res = await api.patch(`${UserEndPoint.blogEndpoint}/like`, {blogId});
    return res.data;
}

export const deleteBlog = async (blogId: string) => {
    const res = await api.delete(`${UserEndPoint.blogEndpoint}/${blogId}`);
    return res.data;
}

export const registerUser = async (signupPayload: RegisterUser) => {
    const res = await api.post(UserEndPoint.siginupEndpoint, signupPayload);
    return res.data;
}

export const loginUser = async (loginPayload: LoginPayloadType) => {
    const res = await api.post(UserEndPoint.loginEndpoint, loginPayload);
    return res.data;
}
