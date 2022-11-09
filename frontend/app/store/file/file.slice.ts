import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ICurrentPath {
	currentPath: string,
	dirId: number | undefined
}

const initialState: ICurrentPath = {
	currentPath: '',
	dirId: undefined
}

export const fileSlice = createSlice({
	name: 'file',
	initialState,
	reducers: {
		setPath: (state, { payload }: PayloadAction<ICurrentPath>) => {
			state.currentPath = payload.currentPath
			state.dirId = payload.dirId
		}
	}
})