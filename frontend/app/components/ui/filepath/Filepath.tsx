import {useTypedSelector} from '@/hooks/useTypedSelector'
import {FC, PropsWithChildren} from 'react'

interface Props {
}

const Filepath: FC<PropsWithChildren<Props>> = ({ children }) => {
	const { currentPath } = useTypedSelector(state => state.file)
	return (
		<div className={'text-2xl font-bold p-2 pb-3 select-none'}>
			{currentPath}
		</div>
	)
}

export default Filepath