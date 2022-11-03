import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import styles from './Button.module.scss'

interface Props {
	onClick?: () => void
	type: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const Button: FC<PropsWithChildren<Props>> = ({ children, onClick, type }) => {
	return (
		<button onClick={onClick} className={styles.container} type={type}>
			{children}
		</button>
	)
}

export default Button
