import { IUser } from "../../users/types/user.interface";

export interface AuthResponse {
  user: IUser,
  tokens: {
    access: string,
    refresh: string
  }

}