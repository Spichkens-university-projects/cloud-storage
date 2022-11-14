import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { IFile, IFolderCreate } from '@/types/file/file.interface';

import { API_SERVER } from '../../api/axios';
import { IAuthResponse } from '../../types/auth/auth.interface';
import { IUser } from '../../types/user/user.interface';
import { TypeRootState } from '../store';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Profile', 'Files'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_SERVER,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as TypeRootState).auth.accessToken;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (build) => ({
        // USER DATA
        getProfile: build.query<IUser, any>({
            query: () => `/user/profile`,
            providesTags: () => [{ type: 'Profile' }],
        }),
        // AUTH
        refresh: build.query<IAuthResponse, any>({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
                credentials: 'include',
            }),
        }),
        // FOLDER
        createNewDirectory: build.mutation<unknown, IFolderCreate>({
            query: (body: IFolderCreate) => ({
                url: '/file/create',
                method: 'POST',
                body,
            }),
            transformResponse(response) {},
            invalidatesTags: () => ['Files'],
        }),
        // GET FILES
        getFilesFromRoot: build.query<IFile[], any>({
            query: () => `/file`,
            providesTags: () => [{ type: 'Files' }],
        }),
        getFilesFromDirectory: build.query<IFile[], number | undefined>({
            query: (parentId: number) => `/file/root/${parentId}`,
            providesTags: () => [{ type: 'Files' }],
        }),
    }),
});
