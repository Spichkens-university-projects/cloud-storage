import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_HOST } from "../../api/axios";
import { IAuthResponse } from "../../types/auth/auth.interface";
import { IUser } from "../../types/user/user.interface";
import { TypeRootState } from "../store";


export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Profile", "Files"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as TypeRootState).auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints: build => ({
    // USER DATA
    getProfile: build.query<IUser, any>({
      query: () => `/user/profile`,
      providesTags: () => [{ type: "Profile" }]
    }),
    refresh: build.query<IAuthResponse, any>({
      query: () => ({ url: "/auth/refresh", method: "GET", credentials: "include" })
    })
  })
});
