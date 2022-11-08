import { IUser } from '../../user/types/user.interface'

export interface IAuthResponse {
  user: Partial<IUser>
  accessToken: string
  refreshToken: string
}
