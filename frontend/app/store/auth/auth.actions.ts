import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AuthService } from "../../services/auth.service";
import { IAuthLoginFields, IAuthRegisterFields, IAuthResponse } from "../../types/auth/auth.interface";
import { toastError } from "../../utils/error-handler";

export const signUp = createAsyncThunk<IAuthResponse, IAuthRegisterFields>(
  "auth/register",
  async ({ email, name, surname, password }, thunkAPI) => {
    try {
      const response = await AuthService.register({ email, password, name, surname })
      toast.success('Пользователь был успешно создан')
      return response
    } catch (e: any) {
      toastError(e)
      return thunkAPI.rejectWithValue(e)
    }
  }
);

export const signIn = createAsyncThunk<IAuthResponse, IAuthLoginFields>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response =  await AuthService.login({ email, password })
      toast.success('Вход выполнен успешно')
      return response
    } catch (e: any) {
      toastError(e)
      return thunkAPI.rejectWithValue(e)
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    return {}
  }

);