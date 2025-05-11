import { useForm } from "react-hook-form";
import type { userSignup } from "../types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { signupSchema } from "../validations/validation";
import { useEffect } from "react";

function Signup() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token)
      navigate("/")
  }, [])
  const { register, handleSubmit, formState: {errors} } = useForm<userSignup>({resolver: yupResolver(signupSchema)});
  const navigate = useNavigate();

  return (
    <div className="bg-(--secondary) flex flex-col justify-center items-center h-screen">
      <div className="bg-(--light) rounded-(--radius) px-20 py-10">
        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className="flex flex-col gap-(--gap)"
        >
          <h1 className="m-auto text-2xl">Sign up</h1>
          <div className="flex flex-col">
            <input 
              type="text" 
              {...register("name")} 
              placeholder="Enter name" 
              />
            {errors.name && <span className="text-(--danger) error-font-size">* {errors.name.message}</span>}
          </div>
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
          <div className="flex flex-col mb-2">
            <input
              type="text"
              {...register("country")}
              placeholder="Enter country"
            />
            {errors.country && <span className="text-(--danger) error-font-size">* {errors.country.message}</span>}
          </div>
          <button
            type="submit"
            className="bg-(--success) px-(--paddingX) py-(--paddingY) rounded-(--radius) cursor-pointer outline-none"
          >
            SUBMIT
          </button>
        </form>
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-center text-lg">Or</p>
            <LoginWithGoogle />
            <div className="text-right">
              Have account{" "} 
              <button className="underline cursor-pointer" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
