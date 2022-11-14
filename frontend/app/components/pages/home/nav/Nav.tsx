import React, { FC, PropsWithChildren, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillFileAdd, AiFillFolderAdd } from 'react-icons/ai';

import GobackArrow from '@/components/ui/goback-arrow/GobackArrow';

import { useAuth } from '@/hooks/useAuth';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { axiosClassic } from '../../../../api/axios';

import styles from './Nav.module.scss';

interface Props {
    onOpen: () => void;
}

const Nav: FC<PropsWithChildren<Props>> = ({ children, onOpen }) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const { dirId, currentPath } = useTypedSelector((state) => state.file);
    const { accessToken } = useTypedSelector((state) => state.auth);

    const { register, handleSubmit } = useForm();
    const { user } = useAuth();

    const pickFile = async (e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        await axiosClassic.post(
            `/file/upload?userId=${user?.id}&dir=${currentPath}&dirId=${dirId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
    };

    return (
        <header className={styles.header}>
            <GobackArrow />
            <div className={'flex flex-row'}>
                <AiFillFolderAdd
                    color={'grey'}
                    size={42}
                    onClick={onOpen}
                    className={styles.icon}
                    title={'Создать папку'}
                />
                <AiFillFileAdd
                    color={'grey'}
                    size={42}
                    className={styles.icon}
                    onClick={() => fileRef?.current?.click()}
                />
            </div>

            <input
                ref={fileRef}
                onChange={pickFile}
                hidden={true}
                type={'file'}
                title={'Загрузить файл'}
                className={'w-full h-full'}
            />
        </header>
    );
};

export default Nav;
