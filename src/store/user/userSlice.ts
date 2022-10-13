import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser, IUserSlice } from './userSlice.contracts';

const initialState: IUserSlice = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: IUser }>) {
      const { user } = action.payload;
      state.user = user;
    },

    /**
     * Dispatch resetUser to reset the redux store. Handy when clearing user sessions when logging out.
     */
    resetUser(state, action) {
      console.log('resetting store');
    }
  },
});

export default userSlice.reducer;

export const selectUser = (state: RootState): typeof initialState => state.user;
