import { configureStore, combineReducers, AnyAction, ThunkAction, Action } from '@reduxjs/toolkit';
import themeSlice from './theme/themeSlice';
import userSlice from './user/userSlice';
import { env } from 'src/env';
import { createReduxEnhancer } from '@sentry/react';
import { baseApi } from 'src/services/restApi/queries/baseApi.service';

const sentryReduxEnhancer = createReduxEnhancer({
  //TODO: CHECK IF THERE IS INFO WE DON'T WANT TO SEND TO SENTRY
  // actionTransformer: (action) => {
  //     if (action.type === 'GOVERNMENT_SECRETS') {
  //         // Return null to not log the action to Sentry
  //         return null;
  //     }
  //     if (action.type === 'SET_PASSWORD') {
  //         // Return a transformed action to remove sensitive information
  //         return {
  //             ...action,
  //             password: null,
  //         };
  //     }
  //     return action;
  // },
  // stateTransformer: (state) => {
  //     if (state.topSecret.doNotSend) {
  //       // Return null to not send this version of the state.
  //       return null;
  //     }
  //     // Transform the state to remove sensitive information
  //     const transformedState = {
  //       ...state,
  //       topSecret: {
  //         ...state.topSecret,
  //         // Replace sensitive information with something else
  //         nuclearLaunchCodes: 'I love pizza',
  //         // or just remove it entirely
  //         hiddenTreasureLocation: null,
  //       },
  //       // You should also remove large data that is irrelevant to debugging to not clutter your Sentry issues
  //       giganticState: null,
  //     };
  //     return transformedState;
  //   },
});

const combinedReducer = combineReducers({
  theme: themeSlice,
  user: userSlice,
  [baseApi.reducerPath]: baseApi.reducer,
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
      baseApi.middleware,
    ),
    enhancers: [sentryReduxEnhancer],
});

export default store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
