import { IUser } from '../../user/types/user.interface'

export interface AuthResponse {
  user: Partial<IUser>
  accessToken: string
}
