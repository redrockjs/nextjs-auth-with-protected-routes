import {apiSlice} from "../apiSlice";
import {LoginQueryParams, TokensDTO} from "./auth.types";

export const authEndpoints = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<TokensDTO, LoginQueryParams>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      })
    }),
    refreshToken: build.mutation<TokensDTO, { token: string }>({
      query: (body) => ({
        url: '/auth/refresh',
        method: 'PUT',
        body
      })
    })
  }),
  overrideExisting: false
})