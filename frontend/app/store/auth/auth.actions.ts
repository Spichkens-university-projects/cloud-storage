import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { AuthService } from "../../services/auth.service";
import { IAuthLoginFields, IAuthRegisterFields, IAuthResponse } from "../../types/auth/auth.interface";
import { toastError } from "../../utils/error-handler";

export const signUp = createAsyncThunk<IAuthResponse, IAuthRegisterFields>(
  "auth/register",
  async ({ email, name, surname, password }, thunkAPI) => {
    try {
      const response = await AuthService.register({ email, password, name, surname });
      setCookie("refresh", response.refreshToken, { maxAge: 31536000 });
      toast.success("Пользователь был успешно создан");
      return response;
    } catch (e: any) {
      toastError(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const signIn = createAsyncThunk<IAuthResponse, IAuthLoginFields>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login({ email, password });
      setCookie("refresh", response.refreshToken, { maxAge: 31536000 });
      toast.success("Вход выполнен успешно");
      return response;
    } catch (e: any) {
      toastError(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const refresh = createAsyncThunk<IAuthResponse, null>(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.refresh();
      setCookie("refresh", response.refreshToken, { maxAge: 31536000 });
      return response;
    } catch (e: any) {
      toastError(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    deleteCookie("refresh");
    return;
  }
);
