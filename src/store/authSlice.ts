import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setCookie, deleteCookie} from 'cookies-next';

type AccessTokenType = null | string
type RefreshTokenType = null | string

type InitialStateType = {
  accessToken: AccessTokenType
  refreshToken: RefreshTokenType
};

export type Tokens = { accessToken: string, refreshToken: string }

const initialState: InitialStateType = {
  accessToken:
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken') || null
      : null,
  refreshToken:
    typeof window !== 'undefined'
      ? localStorage.getItem('refreshToken') || null
      : null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Tokens>) => {
      const {accessToken, refreshToken} = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      setCookie('accessToken', accessToken, {maxAge: 60 * 60 * 24})
      setCookie('refreshToken', refreshToken, {maxAge: 60 * 60 * 24 * 30})

    },
    delCredentials: (state, _) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.accessToken = "";
      state.refreshToken = "";
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
    }
  },
});

export const {
  setCredentials,
  delCredentials
} = authSlice.actions;

export default authSlice.reducer;

export const {reducer, actions} = authSlice;
