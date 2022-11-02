import { IUser } from '../../users/types/user.interface'

export interface AuthResponse {
  user: IUser
  accessToken: string
}

export interface AuthUserDto {
  email: string
  password: string
}
