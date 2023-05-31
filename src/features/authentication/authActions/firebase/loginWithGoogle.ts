import { createAsyncThunk } from '@reduxjs/toolkit';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

//Login works both for log in and register
export const signInWithGoogle = createAsyncThunk(
    'user/googleSignIn',
    async (params: {}, { rejectWithValue }) => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth()
        try {
            const res = await signInWithPopup(auth, provider);
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