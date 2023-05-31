import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthStorage } from './setAuthStorage';
import { IUserSlice } from 'src/store/user/userSlice.contracts';

export const persistAuth = createAsyncThunk(
    'user/persistAuth',
    async (
        params: {},
        { rejectWithValue }
    ) => {
        let userAuth: IUserSlice;
        try {
            const auth: string | null = getAuthStorage();
            if (auth === null) {
                userAuth = {
                    user: null,
                    status: 'idle',
                    accessToken: null,
                    refreshToken: null,
                    error: null,
                };
            } else {
                const authSlice: IUserSlice = JSON.parse(auth)
                userAuth = {
                    user: authSlice.user,
                    status: authSlice.status,
                    accessToken: authSlice.accessToken,
                    refreshToken: authSlice.refreshToken,
                    error: authSlice.error,
                };
            }
            return userAuth;
        } catch (error: any) {
            return rejectWithValue(error.message)

        }
    }
);