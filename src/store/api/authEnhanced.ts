import {authEndpoints} from "./authEndpoints";

export const authEnhanced = authEndpoints.enhanceEndpoints({
  addTagTypes:[],
  endpoints:{
    login:{},
    refreshToken:{},
  }
})

export const {
  useLoginMutation,
  useRefreshTokenMutation
} = authEnhanced