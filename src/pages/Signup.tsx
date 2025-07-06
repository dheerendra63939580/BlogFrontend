import { useForm } from "react-hook-form";
import type { RegisterUser as RegisterUserType, userSignup } from "../types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { signupSchema } from "../validations/validation";
import { useEffect, useState } from "react";
import { countryName, UserEndPoint } from "../constant";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api";
import { toast } from "sonner";
import  { Loading } from "../components/ButtonLoading";
import { useSignWithGoogle } from "../hooks/useSignWithGoogle";

function Signup() {

  const { register, handleSubmit, formState: {errors} } = useForm<userSignup>({resolver: yupResolver(signupSchema)});
  const [userToken, setUserToken] = useState("");
  const [isCountry, setIsCountry] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token)
      navigate("/")
  }, []);
  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data?.message);
      navigate("/login")
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  const handleUserToken = (token: string) => {
    setUserToken(token)
    setIsCountry(true);
  }
  const {signInMutation} = useSignWithGoogle()
    const handleLogin = (country: string) => {
      if(country.length === 0) {
        toast.warning("Please select country name");
        return;
      }
      signInMutation.mutate({
        endpoint: UserEndPoint.signInByGoogle, 
        data: {userToken, country}
      })
    }

  return (
    <div className="bg-(--secondary) flex flex-col justify-center items-center h-screen">
      <div className="bg-(--light) rounded-(--radius) px-20 py-10">
        <form
          onSubmit={handleSubmit((data: RegisterUserType) => registerUserMutation.mutate(data))}
          className={`flex flex-col gap-(--gap) ${isCountry ? "hidden" : ""}`}
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
            <select {...register("country")}>
              <option value="">Select Country</option>
              {countryName.map((name) => (
                <option value={name} key={name}>{name}</option>
              ))}
            </select>
            {errors.country && <span className="text-(--danger) error-font-size">* {errors.country.message}</span>}
          </div>
          <button
            type="submit"
            className="bg-(--success) px-(--paddingX) py-(--paddingY) rounded-(--radius) cursor-pointer outline-none"
            disabled={registerUserMutation.isPending}
          >
            {registerUserMutation.isPending ? <Loading /> : "SUBMIT"}
          </button>
        </form>
        <div className="mt-4 flex flex-col gap-4">
          <p className={`text-center text-lg ${isCountry ? "hidden" : ""}`}>Or</p>
          <select onChange={(e) => handleLogin(e.target.value)} className={!isCountry && "hidden" || ""}>
              <option value="">Select Country</option>
              {countryName.map((name) => (
                <option value={name} key={name}>{name}</option>
              ))}
            </select>
          <LoginWithGoogle handleUserToken={handleUserToken}/>
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
