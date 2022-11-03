import { IAuthResponse } from "../../types/auth/auth.interface";

export interface IAuthInitialState extends IAuthResponse {
  isLoading: boolean
}