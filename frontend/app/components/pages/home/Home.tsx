import Nav from '@/components/pages/home/nav/Nav'
import CustomModal from '@/components/ui/CustomModal'
import File from '@/components/ui/file/File'
import Filepath from '@/components/ui/filepath/Filepath'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { api } from '@/store/api/api'
import { useDisclosure } from '@chakra-ui/react'
import React, { FC, PropsWithChildren, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../layout/Layout'

import styles from './Home.module.scss'

interface Props {
}

const Home: FC<PropsWithChildren<Props>> = ({ children }) => {
	const { currentPath, dirId } = useTypedSelector(state => state.file)
	const dispatch = useDispatch()

	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef<HTMLInputElement>(null)
	const finalRef = React.useRef<HTMLInputElement>(null)

	const [value, setValue] = useState<string>('')

	const { data: files } = api.useGetFilesFromRootQuery(null)
	const { data: currentDirectoryFiles } = api.useGetFilesFromDirectoryQuery(dirId)
	const [createNewDirectory, { data, error, isError, isSuccess }] = api.useCreateNewDirectoryMutation()

	const onCreate = async () => {
		if (value != '') {
			await createNewDirectory({ fileName: value })
			onClose()
		}
	}


	return <Layout>
		<CustomModal onClose={onClose} isOpen={isOpen} onOpen={onOpen}
								 initialRef={initialRef} finalRef={finalRef}
								 fun={onCreate} setValue={setValue} />
		<Nav onOpen={onOpen} />
		<Filepath currentPath={currentPath} />
		<div className={styles.filesList}>
			{files?.map(file => <File file={file} key={file.id}>{file.fileName}</File>)}
		</div>

	</Layout>
}

export default Home
