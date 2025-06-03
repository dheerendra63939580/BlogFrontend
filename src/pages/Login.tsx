import { useForm } from "react-hook-form";
import type { LoginPayloadType, LoginResponse, userLogin } from "../types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/validation";
import { useNavigate } from "react-router-dom";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";
import { toast } from "sonner";
import { Loading } from "../components/ButtonLoading";

function Login() {

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token)
      navigate("/")
  }, [])
  const { register, handleSubmit, formState: {errors} } = useForm<userLogin>({resolver: yupResolver(loginSchema)});
  const userLoginMutation = useMutation<LoginResponse, Error, LoginPayloadType>({
    mutationFn: loginUser,
    onSuccess: function (data) {
      toast.success(data?.message || "Logged in successfully");
      localStorage.setItem("token", data.data.token)
      navigate("/")
    },
    onError: function (err) {
      toast.error(err?.message || "Something went wrong");
    }
  })

  return (
    <div className="bg-(--secondary) flex flex-col justify-center items-center h-screen">
      <div className="bg-(--light) rounded-(--radius) px-20 py-10">
        <form
          onSubmit={handleSubmit((data) => userLoginMutation.mutate(data))}
          className="flex flex-col gap-(--gap)"
        >
          <h1 className="m-auto text-2xl">Log in</h1>
          <div className="flex flex-col">
            <input
              type="email"
              {...register("email")}
              placeholder="Enter email"
            />
            {errors.email && <span className="text-(--danger) error-font-size">* {errors.email?.message}</span>}
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              {...register("password")}
              placeholder="Enter password"
            />
            {errors.password && <span className="text-(--danger) error-font-size">* {errors.password.message}</span>}
          </div>
          <button
            type="submit"
            className="bg-(--success) px-(--paddingX) py-(--paddingY) rounded-(--radius) cursor-pointer outline-none"
            disabled={userLoginMutation.isPending}
          >
            {userLoginMutation.isPending ? <Loading/> : "SUBMIT"}
          </button>
        </form>
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-center text-lg">Or</p>
            <LoginWithGoogle />
            <div className="text-right">
              Not Have account {" "} 
              <button className="underline cursor-pointer" onClick={() => navigate("/signup")}>
                Sign up
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
