export interface IAuthResponse {
  user: {
    id: number
    email: number
  } | null
  accessToken: string
}

export interface IAuthLoginFields {
  email: string
  password: string
}

export interface IAuthRegisterFields extends IAuthLoginFields{
  name: string
  surname: string
}