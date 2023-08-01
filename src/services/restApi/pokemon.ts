import { GridPaginationModel } from '@mui/x-data-grid'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPokemon } from 'src/features/pokemon/models/pokemon'
import queryReAuthWrapper from 'src/features/authentication/services/refreshToken'
import store, { RootState } from 'src/store/store'
import { getAuth } from 'firebase/auth'
import { env } from 'src/env'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: queryReAuthWrapper(fetchBaseQuery({
    // Base backend API URL
    baseUrl: env.REACT_APP_BASE_API_URL, //TODO: change this to an env variable
    prepareHeaders: (headers, { getState }) => {
      const token = store.getState().user.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  })),
  refetchOnMountOrArgChange: 30, // (sec) will refresh cache when called on this interval
  tagTypes: ['Pokemon'], //Set a tag which one can invalidate on a mutation
  endpoints: (builder) => ({
    getAllUsers: builder.query<IPokemon, GridPaginationModel>({
      query: (paginationModel) =>
        `pokemon?limit=${paginationModel.pageSize}&offset=${paginationModel.page * paginationModel.pageSize}`,
      providesTags: (result, error, page) =>
        result
          ? [
            // Provides a tag for each pokemon in the current page,
            // as well as the 'PARTIAL-LIST' tag.
            ...result.results.map(({ name }: { name: string }) => ({ type: 'Pokemon' as const, name })),
            { type: 'Pokemon', id: 'PARTIAL-LIST' },
          ]
          : [{ type: 'Pokemon', id: 'PARTIAL-LIST' }],
    }),
      // ############################## GET USER BY ID ###################################
      getUserById: builder.query<{ isSuccess: boolean; value: any }, { userId: string }>({
        query: ({ userId }: { userId: string }) => ({
            url: `/pokemon/${userId}/`,
            method: 'GET',
        }),
        providesTags: (result, error, arg) => [{ type: 'Pokemon', id: arg.userId }],
        onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
            try {
                //every time the user updates their own profile, we just update our userSlice db user as well with updated values
                const { data } = await queryFulfilled;
                const userId: string | null = (store.getState() as RootState).user.user.dbUser
                    .id;
                if (arg.userId === userId) {
                    const user: any = (store.getState() as RootState).user.user;
                    // dispatch(
                    //     syncUserSlice({
                    //         user: { ...user, dbUser: data.value },
                    //     }),
                    // );
                }
            } catch (error) {
                console.error(error);
            }
        },
    }),
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery, useLazyGetAllUsersQuery, useGetUserByIdQuery, useLazyGetUserByIdQuery } = pokemonApi