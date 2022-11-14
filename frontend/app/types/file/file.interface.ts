import { FileTypes } from '@/types/file/file.types';
import { IUser } from '@/types/user/user.interface';

export interface IFolderCreate {
    fileName: string;
    parentId?: number;
}

export interface IFile {
    id: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    fileType: FileTypes;
    parent: IFile;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICurrentPath {
    currentPath: string | undefined;
    dirId: number | undefined;
    prevId: number | undefined;
}

export interface IFileCreate {
    file: FormData;
    query: {
        userId: number | undefined;
        dirId: number | undefined;
        dir: string | undefined;
    };
}

export const ROOT_PATH = '/';
