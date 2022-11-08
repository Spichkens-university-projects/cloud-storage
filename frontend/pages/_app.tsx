import type { AppProps } from "next/app";
import NextProgressBar from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import AuthProvider from "../app/providers/AuthProvider";
import { TypeComponentAuthFields } from "../app/providers/private-route.interface";
import { store } from "../app/store/store";
import "../app/styles/globals.css";

type TypedAppProps = AppProps & TypeComponentAuthFields

export default function App({ Component, pageProps }: TypedAppProps) {
  return (
    <>
      <NextProgressBar color={"#71aaeb"} startPosition={0.3} stopDelayMs={200} height={3} />
      <Provider store={store}>
        <Toaster position="top-left" reverseOrder={true} toastOptions={{ duration: 2000 }} />
        <AuthProvider Component={Component}>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </>
  );
}
