import { createApi } from '@reduxjs/toolkit/dist/query/react/index';
import { baseQueryWithTokenExpirationCheck } from './config/query.config';
import { TAG_TYPES } from './config/apiTags';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithTokenExpirationCheck,
  tagTypes: [...TAG_TYPES],
  endpoints: () => ({}),
});