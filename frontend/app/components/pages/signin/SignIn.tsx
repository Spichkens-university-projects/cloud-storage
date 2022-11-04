import { useRouter } from "next/router";
import {  FC, PropsWithChildren, useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { IAuthLoginFields } from "../../../types/auth/auth.interface";
import Headers from "../../Headers";
import Input from "../../ui/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/button/Button";

import styles from "./SignIn.module.scss";
import Link from "next/link";

interface Props {
}

const SignIn: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { register, handleSubmit, formState: { isSubmitSuccessful, isSubmitting } } = useForm<{
    email: string
    password: string
  }>();

  const { signIn } = useActions();
  const { replace } = useRouter();

  const onSubmit: SubmitHandler<IAuthLoginFields> = (data, event) => {
    signIn(data);
    replace('/')
  };


  return (
    <div className={styles.wrapper}>
      <Headers title={'Аутентификация'}/>
      <div className={styles.container}>
        <h1 className="text-3xl text-center mb-5">Вход в хранилище</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <Input
            placeholder={"Почта"}
            type={"email"}
            register={register}
            name={"email"}
          />
          <Input
            placeholder={"Пароль"}
            type={"password"}
            register={register}
            name={"password"}
          />
          <Button type={"submit"}>Войти</Button>
          <Link href={"/signup"} className={"text-center text-blue-500"}>
            Зарегистрироваться
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
