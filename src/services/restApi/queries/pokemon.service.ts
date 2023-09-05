import store, { RootState } from 'src/store/store';
import { baseApi } from './baseApi.service';
import { IPokemon } from 'src/features/pokemon/models/pokemon';
import { GridPaginationModel } from '@mui/x-data-grid/models';
import { Endpoint, TagId } from './config/apiTags';


const pokemonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<IPokemon, GridPaginationModel>({
          query: (paginationModel) =>
            `pokemon?limit=${paginationModel.pageSize}&offset=${paginationModel.page * paginationModel.pageSize}`,
          providesTags: (result, error, page) =>
            result
              ? [
                // Provides a tag for each pokemon in the current page,
                // as well as the 'PARTIAL-LIST' tag.
                ...result.results.map(({ name }: { name: string }) => ({ type: Endpoint.POKEMON as const, name })),
                { type: Endpoint.POKEMON, id: TagId.PARTIAL_LIST },
              ]
              : [{ type: Endpoint.POKEMON, id: TagId.PARTIAL_LIST }],
            extraOptions: { maxRetries: 1 } // will retry this 1 times
        }),
          // ############################## GET USER BY ID ###################################
          getUserById: builder.query<{ isSuccess: boolean; value: any }, { userId: string }>({
            query: ({ userId }: { userId: string }) => ({
                url: `/pokemon/${userId}/`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) => [{ type: Endpoint.POKEMON, id: arg.userId }],
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    //every time the user updates their own profile, we just update our userSlice db user as well with updated values
                    //TODO: IMPLEMENT - AND IS THIS NECESSARY
                    const { data } = await queryFulfilled;
                    const userId: string | null = (store.getState() as RootState).user.user.dbUser
                        .id;
                    if (arg.userId === userId) {
                        const user: any = (store.getState() as RootState).user.user;
                    }
                } catch (error) {
                    console.error(error);
                }
            },
          }),

            // ############################# GET All LANGUAGES #############################
            getLanguage: builder.query<any[], any>({
              query: () => 'https://proteus-api.dev.voxcroft.com/api/1/Language',
              extraOptions: { maxRetries: 0 } // will retry this 1 times
          }),
      }),
})

export const { useGetAllUsersQuery, useLazyGetAllUsersQuery, useGetUserByIdQuery, useLazyGetUserByIdQuery, useGetLanguageQuery } = pokemonApi;