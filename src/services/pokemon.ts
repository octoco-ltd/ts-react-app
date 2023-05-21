// Need to use the React-specific entry point to import createApi
import { GridPaginationModel } from '@mui/x-data-grid'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPokemon } from 'src/models/pokemon'
// import type { Pokemon } from './types'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    // Base backend API URL
    baseUrl: 'https://pokeapi.co/api/v2/',

    // prepareHeaders is used to configure the header of every request 
    // and gives access to getState which we use to include the token from the store
    //TODO: set this up!
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.userToken
    //   if (token) {
    //     // include token in req header
    //     headers.set('authorization', `Bearer ${token}`)
    //     return headers
    //   }
    // },
  }),//TODO: change this to an env variable
  refetchOnMountOrArgChange: 30, // (sec) will refresh cache when called on this interval
  tagTypes: ['Pokemon'], //Set a tag which one can invalidate on a mutation
  endpoints: (builder) => ({
    getAllPokemon: builder.query<IPokemon, GridPaginationModel>({
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
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllPokemonQuery, useLazyGetAllPokemonQuery } = pokemonApi