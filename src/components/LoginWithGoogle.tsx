import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signInByGoogle } from "../api";
import type { SignInByGooglePayload, SignInResponse } from "../types/types";
import { useNavigate } from "react-router-dom";
import { UserEndPoint } from "../constant";

function LoginWithGoogle() {

  const navigate = useNavigate()
  const signInMutation = useMutation<SignInResponse, Error, SignInByGooglePayload>({
    mutationFn: signInByGoogle,
    onSuccess: (data) => {
      console.log("success", data?.data);
      localStorage.setItem("token", data?.data?.data?.token)
      toast.success(data?.data?.message || "User logged in successfully")
      navigate("/")
    },
  })
  const handleLogin = (credentials: CredentialResponse ) => {
    signInMutation.mutate({
      endpoint: UserEndPoint.signInByGoogle, 
      data: {userToken: credentials.credential || ""}
    })
  }

  return (
    <GoogleLogin
      onSuccess={(credentials) => handleLogin(credentials)}
      onError={() => {
          console.log('Login Failed');
          toast.error('Login Failed')
      }}
      useOneTap
    />
  )
}

export default LoginWithGoogle