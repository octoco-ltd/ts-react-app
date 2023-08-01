import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import themeSlice from './theme/themeSlice';
import userSlice from './user/userSlice';
import { pokemonApi } from '../services/restApi/pokemon'
import { env } from 'src/env';

const combinedReducer = combineReducers({
  theme: themeSlice,
  user: userSlice,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'user/resetUser') {
    // Reset the Redux store
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  devTools: env.REACT_APP_DEPLOYMENT_ENV !== 'production',
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      pokemonApi.middleware,
    ),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
