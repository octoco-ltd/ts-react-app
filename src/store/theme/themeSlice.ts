import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IThemeState, themeNames } from './themeSlice.contracts';

const initialState: IThemeState = {
  theme: localStorage.getItem('appTheme') || themeNames.dark,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<{ theme: themeNames }>) {
      const { theme } = action.payload;
      state.theme = theme;
    },
    toggleTheme(state, action) {
      if (state.theme === themeNames.dark) state.theme = themeNames.light;
      else state.theme = themeNames.dark;
    },
  },
});

export default themeSlice.reducer;
export const { setTheme, toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;
