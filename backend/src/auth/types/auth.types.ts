import { IUser } from '../../users/types/user.interface'

export interface AuthResponse {
  user: Partial<IUser>
  accessToken: string
}
