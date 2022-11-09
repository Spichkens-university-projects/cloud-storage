import { IFile } from '@/types/file/file.interface'
import { FileTypes } from '@/types/file/file.types'
import { FC, PropsWithChildren } from 'react'
import { AiFillFile, AiFillFolder } from 'react-icons/ai'

import styles from './File.module.scss'

interface Props {
	file: IFile;
}

const File: FC<PropsWithChildren<Props>> = ({ children, file }) => {

	return (
		<div className={styles.wrapper} onClick={() => console.log()}>
			{file.fileType === FileTypes.file
				? <AiFillFile color={'grey'} size={128} />
				: <AiFillFolder color={'grey'} size={128} />
			}
			<div className={styles.fileName}>{children}</div>
		</div>
	)
}

export default File