import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import {Provider} from "react-redux";
import {store} from "@/src/store/store";

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Next Routes</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
