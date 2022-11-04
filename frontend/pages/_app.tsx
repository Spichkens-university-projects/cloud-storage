import "../app/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "../app/providers/AuthProvider";
import { TypeComponentAuthFields } from "../app/providers/private-route.interface";
import { persistor, store } from "../app/store/store";
import NextProgressBar from 'nextjs-progressbar'

type TypedAppProps = AppProps & TypeComponentAuthFields

export default function App({ Component, pageProps }: TypedAppProps) {
  return (
    <>
      <NextProgressBar color={"#71aaeb"} startPosition={0.3} stopDelayMs={200} height={3} />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Toaster position="top-left" reverseOrder={true} toastOptions={{ duration: 2000 }} />
          <AuthProvider Component={Component}>
            <Component {...pageProps} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
