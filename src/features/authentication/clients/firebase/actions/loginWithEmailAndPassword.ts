import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    UserCredential,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';

export const loginWithEmailAndPassword = createAsyncThunk(
    'user/loginWithEmailAndPassword',
    async (
        params: { email: string; password: string; },
        { rejectWithValue }
    ) => {
        const auth = getAuth()
        try {
            const res: UserCredential = await signInWithEmailAndPassword(
                auth,
                params.email,
                params.password
            );
            return {
                user: res.user,
                status: 'authenticated',
                accessToken: await res.user.getIdToken(),
                refreshToken: res.user.refreshToken,
                error: null,
            };
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);