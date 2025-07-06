import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signInByGoogle } from "../api";
import type { SignInByGooglePayload, SignInResponse } from "../types/types";
import { useNavigate } from "react-router-dom";
import { UserEndPoint } from "../constant";
import { useSignWithGoogle } from "../hooks/useSignWithGoogle";
interface LoginWithGoogleProps {
  handleUserToken?: (token: string) => void;
}
function LoginWithGoogle({handleUserToken}: LoginWithGoogleProps) {

  const {signInMutation} = useSignWithGoogle()
  const handleLogin = (credentials: CredentialResponse ) => {
    if(handleUserToken) {
      handleUserToken(credentials?.credential || "");
      return ;
    }
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