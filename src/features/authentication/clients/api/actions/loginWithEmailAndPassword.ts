import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { env } from 'src/env'

// authActions.js
export const loginWithEmailAndPassword = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {

            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            // Send API call to login
            // This can change to FE login if a basic implementation is required
            const { data } = await axios.post(
                `${env.REACT_APP_BASE_API_URL}/api/user/login`,
                { email, password },
                config
            )

            // store user's token in local storage
            localStorage.setItem('userToken', data.userToken)
            return {
                user: data.user,
                status: 'authenticated',
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                error: null,
            }

        } catch (error: any) {

            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)