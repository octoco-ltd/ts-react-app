import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthStorage } from './setAuthStorage';
import { IUserSlice } from 'src/store/user/userSlice.contracts';

export const persistAuth = createAsyncThunk(
    'user/persistAuth',
    async (
        params: {userAuth: IUserSlice},
        { rejectWithValue }
    ) => {
        try {
            return params.userAuth;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);