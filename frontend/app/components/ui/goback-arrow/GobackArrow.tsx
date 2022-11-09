import {useTypedSelector} from "@/hooks/useTypedSelector";
import {fileSlice} from "@/store/file/file.slice";
import {ROOT_PATH} from "@/types/file/file.interface";
import {FC, PropsWithChildren, useEffect, useState} from 'react'
import {BsArrowLeftCircleFill} from 'react-icons/bs'
import {useDispatch} from "react-redux";

interface Props {
}

const GobackArrow: FC<PropsWithChildren<Props>> = ({children}) => {
    const {currentPath, dirId, prevId} = useTypedSelector(state => state.file)
    const dispatch = useDispatch()

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(currentPath === '\\')

    useEffect(() => {
        setIsDisabled(currentPath === '\\')
    }, [currentPath])

    const goBack = () => {
        const currentDirName = currentPath.split('\\').pop()
        const prevPath = currentPath.replace(`\\${currentDirName}`, '')

        dispatch(fileSlice.actions.setPath({
            currentPath: prevPath === '' ? ROOT_PATH : `${prevPath}`,
            dirId: prevId,
            prevId: dirId
        }))
    }

    return (
        <div className={'px-2 select-none'}>
            <BsArrowLeftCircleFill
                onClick={goBack}
                style={{cursor: !isDisabled ? 'pointer' : undefined}}
                size={32}
                color={isHovered && !isDisabled ? 'black' : 'grey'}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
        </div>
    )
}

export default GobackArrow