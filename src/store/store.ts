import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper'
import {authSlice} from './authSlice'
import {apiSlice} from './apiSlice';

export const setupStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(apiSlice.middleware),
  });
}
export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore)