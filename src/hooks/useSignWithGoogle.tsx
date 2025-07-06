import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { SignInByGooglePayload, SignInResponse } from "../types/types";
import { signInByGoogle } from "../api";
import { toast } from "sonner";

export function useSignWithGoogle() {

    const navigate = useNavigate()
  const signInMutation = useMutation<SignInResponse, Error, SignInByGooglePayload>({
    mutationFn: signInByGoogle,
    onSuccess: (data) => {
      console.log("success", data?.data);
      localStorage.setItem("token", data?.data?.data?.token)
      toast.success(data?.data?.message || "User logged in successfully")
      navigate("/")
    },
  });
  return {signInMutation}
}