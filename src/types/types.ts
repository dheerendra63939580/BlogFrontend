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

export interface UserData {
  name: string, 
  avatar: string
}

export interface SignInResponse {
    data: {
        message: string,
        data: {token: string},
        sucess: boolean
    }
}

export interface PrfileResponse {
    data: {
        message: string,
        data: {
            _id: string,
            name: string,
            avatar: string
        },
        sucess: boolean
    }
}

export interface CreateBlog {
    title: string
    content: string
}

interface BlogObject {
    _id: string
    content: string
    userId: {
        name: string
        createdAt: string
        updatedAt: string
        _id: string
    }
}
export interface BlogResponse {
    data: {blogs: BlogObject[]}
    success: boolean
    message: string
}
