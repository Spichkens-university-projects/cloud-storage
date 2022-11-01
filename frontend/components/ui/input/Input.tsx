import {
	FC,
	HTMLInputTypeAttribute,
	PropsWithChildren,
	useEffect,
	useState,
} from 'react'
import classNames from 'classnames/bind'

interface Props {
	placeholder: string
	type: HTMLInputTypeAttribute
	register: any
	name: string
}

import styles from './Input.module.scss'

const cn = classNames.bind(styles)

const Input: FC<PropsWithChildren<Props>> = ({
	placeholder,
	type,
	register,
	name,
}) => {
	const [isFocused, setIsFocused] = useState<boolean>(false)

	return (
		<div
			className={cn({
				container: true,
				blured: !isFocused,
				focused: isFocused,
			})}
		>
			<input
				onFocusCapture={() => setIsFocused(true)}
				onBlurCapture={() => setIsFocused(false)}
				type={type}
				placeholder={placeholder}
				className={cn({
					input: true,
					focused: isFocused,
				})}
				{...register(name)}
			/>
		</div>
	)
}

export default Input
