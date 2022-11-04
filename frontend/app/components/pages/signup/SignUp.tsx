import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "../../../hooks/useActions";
import { IAuthRegisterFields } from "../../../types/auth/auth.interface";
import Headers from "../../Headers";
import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";

import styles from "./SignUp.module.scss";

interface Props {
}

const SignUp: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { register, handleSubmit, formState: { isSubmitSuccessful, errors } } = useForm<{
    email: string
    password: string
    name: string
    surname: string
  }>();

  const { signUp } = useActions();
  const { replace } = useRouter();

  const onSubmit: SubmitHandler<IAuthRegisterFields> = (data, event) => {
    event?.preventDefault()
    signUp(data);
  };


  return (
    <div className={styles.wrapper}>
      <Headers title={'Регистрация'}/>
      <div className={styles.container}>
        <h1 className="text-3xl text-center mb-5">Создать хранилище</h1>
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
          <Input
            placeholder={"Имя"}
            type={"text"}
            register={register}
            name={"name"}
          />
          <Input
            placeholder={"Фамилия"}
            type={"text"}
            register={register}
            name={"surname"}
          />
          <Button type={"submit"}>Отправить</Button>
          <Link href={"/signin"} className={"text-center text-blue-500"}>
            Войти
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
