interface BasicResponse {
    success: boolean
    message: string
}

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
    data : { userToken: string, country?: string }
    endpoint: string
}

export interface UserData {
  _id: string
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

export interface BlogObject {
    _id: string
    title: string
    content?: string
    createdAt: string
    updatedAt: string
    likesCount: number
    hasUserLiked?: boolean
    userId: {
        _id: string
        name: string
        createdAt: string
        updatedAt: string
        avatar: string
        country?: string
    }
}
export interface BlogResponse {
    data: {blogs: BlogObject[]}
    success: boolean
    message: string
}

export interface BlogByIdResponse {
    data: BlogObject
    success: boolean
    message: string
}

export interface UpdateBlogPayload {
    blogId: string
    title: string
    content: string
}

export interface DeleteBlogResponse {
    success: boolean,
    message: string
}

export interface LoginPayloadType {
    email: string
    password: string
}

export interface RegisterUser extends LoginPayloadType {
    name: string
    country: string
}

export interface LoginResponse extends BasicResponse {
    data: {
        token: string
    }
}