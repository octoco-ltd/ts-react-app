import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// eslint-disable-next-line no-duplicate-imports
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXTAUTH_URL
});


export const baseQueryWithTokenExpirationCheck: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if ('error' in result && result.error?.status === 401) {
        //need to refresh or sign out
    }
    return result;
    };