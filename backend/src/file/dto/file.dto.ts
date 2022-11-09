import { FileTypes } from '../entities/file.entity'

export interface CreateDirectoryDto {
	fileName: string
	fileType: FileTypes
	fileSize: number
	parentId: number
}

export type UpdateDirectoryDto = Partial<CreateDirectoryDto>
