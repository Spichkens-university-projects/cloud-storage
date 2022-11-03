import "../app/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "../app/providers/AuthProvider";
import { TypeComponentAuthFields } from "../app/providers/private-route.interface";
import { persistor, store } from "../app/store/store";

type TypedAppProps = AppProps & TypeComponentAuthFields

export default function App({ Component, pageProps }: TypedAppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AuthProvider Component={Component}>
          <Component {...pageProps} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
