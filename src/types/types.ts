export interface userSignup {
    name: string
    email: string
    password: string
    country: string
}

export interface userLogin {
    email: string
    password: string
}

export interface SignInByGooglePayload {
    data : { userToken: string },
    endpoint: string
}