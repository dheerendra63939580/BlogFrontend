import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";

function LoginWithGoogle() {

    const handleLogin = (credentials: CredentialResponse ) => {
        console.log(credentials)
        toast.success("credential received")
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