import {
	FC,
	HTMLInputTypeAttribute,
	PropsWithChildren,
	useState,
} from 'react'
import classNames from 'classnames/bind'
import { FieldError } from "react-hook-form";

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
				focused: isFocused,
			})}
		>
			<input
				onFocusCapture={() => setIsFocused(true)}
				onBlurCapture={() => setIsFocused(false)}
				type={type}
				placeholder={placeholder}
				className={styles.input}
				{...register(name)}
			/>
		</div>
	)
}

export default Input
