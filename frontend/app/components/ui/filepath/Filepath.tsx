import { FC, PropsWithChildren } from 'react'

interface Props {
	currentPath: string
}

const Filepath: FC<PropsWithChildren<Props>> = ({ children, currentPath }) => {

	return (
		<div className={'text-2xl font-bold p-2 pb-3'}>
			/{currentPath}
		</div>
	)
}

export default Filepath