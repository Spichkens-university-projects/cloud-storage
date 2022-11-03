import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth.service";
import { IAuthLoginFields, IAuthRegisterFields, IAuthResponse } from "../../types/auth/auth.interface";

export const signUp = createAsyncThunk<IAuthResponse, IAuthRegisterFields>(
  "auth/register",
  async ({ email, name, surname, password }, thunkAPI) => {
    try {
      return await AuthService.register({ email, password, name, surname })
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
);

export const signIn = createAsyncThunk<IAuthResponse, IAuthLoginFields>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      return await AuthService.login({ email, password })
    } catch (e) {
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