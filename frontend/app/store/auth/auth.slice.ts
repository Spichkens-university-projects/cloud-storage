import { createSlice } from '@reduxjs/toolkit';

import { logout, refresh, signIn, signUp } from './auth.actions';
import { IAuthInitialState } from './auth.interface';

const initialState: IAuthInitialState = {
    user: null,
    accessToken: '',
    isLoading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signUp.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
                state.accessToken = payload.accessToken;
            })
            .addCase(signUp.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.accessToken = '';
            })
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signIn.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
                state.accessToken = payload.accessToken;
            })
            .addCase(signIn.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.accessToken = '';
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.accessToken = '';
            })
            .addCase(
                refresh.fulfilled,
                (state: IAuthInitialState, { payload }) => {
                    state.isLoading = false;
                    state.user = payload.user;
                    state.accessToken = payload.accessToken;
                },
            )
            .addCase(
                refresh.rejected,
                (state: IAuthInitialState, { payload }) => {
                    state.isLoading = false;
                    state.user = null;
                    state.accessToken = '';
                },
            )
            .addCase(refresh.pending, (state) => {
                state.isLoading = true;
            });
    },
});
