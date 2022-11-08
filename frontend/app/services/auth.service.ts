import { axiosClassic } from "../api/axios";
import { IAuthLoginFields, IAuthRegisterFields, IAuthResponse } from "../types/auth/auth.interface";

export const AuthService = {

  async login({ email, password }: IAuthLoginFields) {
    const response = await axiosClassic.post<IAuthResponse>("/auth/login", {
      email, password
    });
    return response.data;
  },

  async register({ email, password, name, surname }: IAuthRegisterFields) {
    const response = await axiosClassic.post<IAuthResponse>("/auth/register", {
      email, password, name, surname
    });
    return response.data;
  },

  async refresh() {
    const response = await axiosClassic.get<IAuthResponse>("/auth/refresh", { withCredentials: true });
    return response.data;
  }


};