import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import themeSlice from './theme/themeSlice';
import userSlice from './user/userSlice';

const combinedReducer = combineReducers({
  theme: themeSlice,
  user: userSlice
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'user/resetUser') {
    // Reset the Redux store
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
