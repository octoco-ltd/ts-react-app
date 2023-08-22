import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    UserCredential,
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from 'firebase/auth';
import { env } from 'src/env';

export const registerWithEmailAndPassword = createAsyncThunk(
    'user/registerWithEmailAndPassword',
    async (
        params: { email: string, password: string },
        { rejectWithValue }
    ) => {
        try {
            const auth = getAuth()
            const res: UserCredential = await createUserWithEmailAndPassword(
                auth,
                params.email,
                params.password
            );
            console.log(env.REACT_APP_APP_BASE_URL)
            await sendEmailVerification(res.user, {
                url: `${env.REACT_APP_APP_BASE_URL}/auth/login`,
            });
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