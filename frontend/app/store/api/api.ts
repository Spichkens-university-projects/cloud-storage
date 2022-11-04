import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_HOST } from "../../api/axios";
import { IUser } from "../../types/user/user.interface";
import { TypeRootState } from "../store";


export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Profile', 'Files'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_HOST,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as TypeRootState).auth.accessToken
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    }
  }),
  endpoints: build => ({
    getProfile: build.query<IUser, any>({
       query: () => `/users/`
    })
  })
})