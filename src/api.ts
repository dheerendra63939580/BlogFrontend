import axios from "axios"
import type { SignInByGooglePayload } from "./types/types";
const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    timeout: 10*1000,
});

export const signInByGoogle = async (payload: SignInByGooglePayload) => {
    try {
        const res = await api.post(payload.endpoint, payload.data);
        return res;

    } catch(err) {
        throw err
    }
}