export interface userSignup {
    name: string
    email: string
    password: string
    confirmPassword: string
    country: string
}

export interface userLogin {
    email: string
    password: string
}