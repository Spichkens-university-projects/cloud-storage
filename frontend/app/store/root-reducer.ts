import { fileSlice } from '@/store/file/file.slice'
import { combineReducers } from 'redux'
import { api } from './api/api'
import { authSlice } from './auth/auth.slice'

export const RootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authSlice.reducer,
	file: fileSlice.reducer
})