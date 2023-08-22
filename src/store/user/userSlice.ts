import { createSlice } from '@reduxjs/toolkit';
import { loginWithEmailAndPassword } from 'src/features/authentication/clients/firebase/actions/loginWithEmailAndPassword';
import { registerWithEmailAndPassword } from 'src/features/authentication/clients/firebase/actions/registerWithEmailAndPassword';
import { persistAuth } from 'src/features/authentication/services/persistAuth';
import { RootState } from '../store';
import { IUserSlice } from './userSlice.contracts';

const initialState: IUserSlice = {
  user: null,
  status: 'idle',
  accessToken: null,
  refreshToken: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Dispatch resetUser to reset the redux store. Handy when clearing user sessions when logging out.
     */
    resetUser(state, action) {
      console.log('resetting store');
    }
  },
  extraReducers(builder) {
    builder
      //###########################       Register       ###########################
      .addCase(persistAuth.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(persistAuth.fulfilled, (state, action) => {
        state.status = action.payload.status
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.user = action.payload.user
        state.error = action.payload.error
      })
      .addCase(persistAuth.rejected, (state, action) => {
        state.status = 'error'
        state.accessToken = null
        state.refreshToken = null
        state.user = null
        state.error = action.error.message
      })
      //###########################       Register       ###########################
      .addCase(registerWithEmailAndPassword.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
        state.status = 'registered'
      })
      .addCase(registerWithEmailAndPassword.rejected, (state, action) => {
        state.status = 'error'
        state.accessToken = null
        state.refreshToken = null
        state.user = null
        state.error = action.error.message
      })
      //########################### Email and Pass Login ###########################
      .addCase(loginWithEmailAndPassword.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.user = action.payload.user
        state.error = null
      })
      .addCase(loginWithEmailAndPassword.rejected, (state, action) => {
        state.status = 'error'
        state.accessToken = null
        state.refreshToken = null
        state.user = null
        state.error = action.error.message
      })
  }
}
);

export default userSlice.reducer;

export const selectUser = (state: RootState): typeof initialState => state.user;
