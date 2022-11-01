import { FC, PropsWithChildren } from 'react'
import Header from '../../layout/header/Header'
import Input from '../../ui/input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../ui/button/Button'

import styles from './SignIn.module.scss'
import Link from 'next/link'

interface Props {}

const SignIn: FC<PropsWithChildren<Props>> = ({ children }) => {
	const { register, handleSubmit } = useForm<{
		email: string
		password: string
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
					<Button type={'submit'}>Войти</Button>
					<Link href={'/signup'} className={'text-center text-blue-500'}>
						Зарегистрироваться
					</Link>
				</form>
			</div>
		</div>
	)
}

export default SignIn
