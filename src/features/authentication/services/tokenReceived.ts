import { createAsyncThunk } from '@reduxjs/toolkit'
import store from 'src/store/store';
import { IUserSlice } from 'src/store/user/userSlice.contracts';

export const tokenReceived = createAsyncThunk(
    'user/refreshUserToken',
    async (
        params: { accessToken: string; refreshToken: string; },
        { rejectWithValue }
    ) => {
        try {

            const user: IUserSlice = await store.getState().user
            return {
                ...user,
                accessToken: params.accessToken,
                refreshToken: params.refreshToken,
            };

        } catch (error: any) {

            return rejectWithValue(error.message)
        }
    }
);