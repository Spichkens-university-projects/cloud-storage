import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { api } from "./api/api";
import { RootReducer } from "./root-reducer";


export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
    }
  }).concat(api.middleware)
});


export type TypeRootState = ReturnType<typeof RootReducer>
