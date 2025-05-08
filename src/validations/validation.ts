import * as yup from "yup";
const requiredMessage = "Required field"
export const signupSchema = yup.object({
    name: yup.string().required(requiredMessage),
    email: yup.string().email().required(requiredMessage),
    password: yup.string().required(requiredMessage),
    country: yup.string().required(requiredMessage)
})

export const loginSchema = yup.object({
    email: yup.string().email().required(requiredMessage),
    password: yup.string().required(requiredMessage),
})