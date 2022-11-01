import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'
import Header from '../../layout/header/Header'
import Button from '../../ui/button/Button'
import Input from '../../ui/input/Input'

import styles from './SignUp.module.scss'

interface Props {}

const SignUp: FC<PropsWithChildren<Props>> = ({ children }) => {
	const { register, handleSubmit } = useForm<{
		email: string
		password: string
		name: string
		surname: string
	}>()

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.container}>
				<h1 className='text-3xl text-center mb-5'>Вход в хранилище</h1>
				<form
					onSubmit={handleSubmit(() => console.log(123))}
					className={styles.form}
				>
					<Input
						placeholder={'Почта'}
						type={'email'}
						register={register}
						name={'email'}
					/>
					<Input
						placeholder={'Пароль'}
						type={'password'}
						register={register}
						name={'password'}
					/>
					<Input
						placeholder={'Имя'}
						type={'text'}
						register={register}
						name={'name'}
					/>
					<Input
						placeholder={'Фамилия'}
						type={'text'}
						register={register}
						name={'surname'}
					/>
					<Button type={'submit'}>Отправить</Button>
					<Link href={'/signin'} className={'text-center text-blue-500'}>
						Войти
					</Link>
				</form>
			</div>
		</div>
	)
}

export default SignUp
