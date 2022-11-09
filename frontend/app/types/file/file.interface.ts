import {FileTypes} from '@/types/file/file.types'
import {IUser} from '@/types/user/user.interface'

export interface IFileCreate {
	fileName: string,
	parentId?: number
}

export interface IFile {
	id: number;
	fileName: string;
	filePath: string;
	fileSize: number;
	fileType: FileTypes;
	parent: IFile;
	user: IUser;
	createdAt: Date
	updatedAt: Date;
}

export interface ICurrentPath {
	currentPath: string,
	dirId: number | undefined
	prevId: number | undefined
}

export const ROOT_PATH = '\\'