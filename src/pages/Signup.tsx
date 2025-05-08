import { useForm } from "react-hook-form";
import type { userSignup } from "../types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../validations/validation";
import { useNavigate } from "react-router-dom";

function Signup() {

  const { register, handleSubmit, formState: {errors} } = useForm<userSignup>({resolver: yupResolver(signupSchema)});
  const navigate = useNavigate();

  return (
    <div className="bg-(--secondary) flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="bg-(--light) rounded-(--radius) flex flex-col gap-(--gap) px-20 py-10"
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
        <div className="flex flex-col">
          <input
            type="text"
            {...register("country")}
            placeholder="Enter country"
          />
          {errors.country && <span className="text-(--danger) error-font-size">* {errors.country.message}</span>}
        </div>
        <div className="text-right">Have account <button className="underline cursor-pointer" onClick={() => navigate("/login")}>Login</button></div>
        <button
          type="submit"
          className="bg-(--success) px-(--paddingX) py-(--paddingY) rounded-(--radius) cursor-pointer outline-none"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default Signup;
