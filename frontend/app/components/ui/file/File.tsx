import {fileSlice} from '@/store/file/file.slice'
import {IFile, ROOT_PATH} from '@/types/file/file.interface'
import {FileTypes} from '@/types/file/file.types'
import {FC, PropsWithChildren} from 'react'
import {AiFillFile, AiFillFolder} from 'react-icons/ai'
import {useDispatch} from 'react-redux'

import styles from './File.module.scss'

interface Props {
    file: IFile;
}

const File: FC<PropsWithChildren<Props>> = ({children, file}) => {
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(fileSlice.actions.setPath({
            currentPath: `${ROOT_PATH}${file.filePath}`,
            dirId: file.id
        }))
    }

    return (
        <div className={styles.wrapper} onClick={onClick}>
            {file.fileType === FileTypes.file
                ? <AiFillFile color={'grey'} size={128}/>
                : <AiFillFolder color={'grey'} size={128}/>
            }
            <div className={styles.fileName}>{children}</div>
        </div>
    )
}

export default File