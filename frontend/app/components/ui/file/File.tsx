import { saveAs } from 'file-saver';
import { FC, PropsWithChildren } from 'react';
import { AiFillFile, AiFillFolder } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import { IFile, ROOT_PATH } from '@/types/file/file.interface';
import { FileTypes } from '@/types/file/file.types';

import { useAuth } from '@/hooks/useAuth';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { fileSlice } from '@/store/file/file.slice';

import { API_SERVER } from '../../../api/axios';

import styles from './File.module.scss';

interface Props {
    file: IFile;
}

const File: FC<PropsWithChildren<Props>> = ({ children, file }) => {
    const dispatch = useDispatch();
    const { accessToken } = useTypedSelector((state) => state.auth);
    const { dirId } = useTypedSelector((state) => state.file);
    const { user } = useAuth();

    const goToFolder = () => {
        dispatch(
            fileSlice.actions.setPath({
                currentPath: `${ROOT_PATH}${file.filePath}`,
                dirId: file.id,
                prevId: dirId,
            }),
        );
    };

    const downloadToClientDownloadsFolder = async () => {
        const response = await fetch(`${API_SERVER}/file/download/${file.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response) {
            saveAs(
                `http://${process.env['API_HOST']}:${process.env['API_PORT']}/user_files/user_${user?.id}${file.filePath}/${file.fileName}`,
                file.fileName,
            );
        }
    };

    const onClick = async () => {
        if (file.fileType === FileTypes.dir) goToFolder();
        else await downloadToClientDownloadsFolder();
    };

    return (
        <div className={styles.wrapper} onClick={onClick}>
            {file.fileType === FileTypes.file ? (
                <AiFillFile color={'grey'} size={128} />
            ) : (
                <AiFillFolder color={'grey'} size={128} />
            )}
            <div className={'line-clamp-1'}>{children}</div>
        </div>
    );
};

export default File;
