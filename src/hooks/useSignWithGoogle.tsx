import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { SignInByGooglePayload, SignInResponse } from "../types/types";
import { signInByGoogle } from "../api";
import { toast } from "sonner";

interface ApiError {
  response: {
    data: {message: string}
  }
}
export function useSignWithGoogle() {

    const navigate = useNavigate()
    const signInMutation = useMutation<SignInResponse, ApiError, SignInByGooglePayload>({
    mutationFn: signInByGoogle,
    onSuccess: (data) => {
      console.log("success", data?.data);
      localStorage.setItem("token", data?.data?.data?.token)
      toast.success(data?.data?.message || "User logged in successfully")
      navigate("/")
    },
    onError: (err) => {
      console.log(err)
      toast.error(err?.response?.data?.message)
    }
  });
  return {signInMutation}
}