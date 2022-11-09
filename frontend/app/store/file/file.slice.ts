import {ICurrentPath, ROOT_PATH} from '@/types/file/file.interface'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'


const initialState: ICurrentPath = {
	currentPath: ROOT_PATH,
	dirId: undefined,
	prevId: undefined
}

export const fileSlice = createSlice({
	name: 'file',
	initialState,
	reducers: {
		setPath: (state, { payload }: PayloadAction<ICurrentPath>) => {
			state.currentPath = payload.currentPath
			state.prevId = state.dirId
			state.dirId = payload.dirId
		}
	}
})