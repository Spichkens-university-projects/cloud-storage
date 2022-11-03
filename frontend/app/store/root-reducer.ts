import { combineReducers } from "redux";
import { authSlice } from "./auth/auth.slice";

export const RootReducer = combineReducers({
  auth: authSlice.reducer
})