import storageSession from 'redux-persist/lib/storage/session'
import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./root-reducer";
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";


const PersistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(PersistConfig, RootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
    }
  })
})


export const persistor = persistStore(store, {})

export type TypeRootState = ReturnType<typeof RootReducer>
