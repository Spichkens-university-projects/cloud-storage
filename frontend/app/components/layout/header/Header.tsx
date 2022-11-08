import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../store/api/api";
import styles from "./Header.module.scss";


const Header: FC<PropsWithChildren> = ({}) => {

  const { user } = useAuth();
  const { pathname } = useRouter();

  const { data, isLoading } = api.useGetProfileQuery(null);
  const { logout } = useActions();

  const isUserLogedIn = user;
  const isUserOnAuthPage = pathname === "signin";

  const onLogout = () => {
    logout();
  };

  if (isLoading) return null;

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href={"/"} className={styles.logo}>
          E-Storage
        </Link>
        {isUserLogedIn
          ?
          <div className={"flex flex-row gap-5"}>
            <h3>{data?.name} {data?.surname}</h3>
            <button onClick={onLogout}>Выйти</button>
          </div>
          :
          isUserOnAuthPage
            ? <Link href={"/signin"} className={styles.signButton}>Войти</Link>
            : null
        }
      </div>
    </header>
  );
};

export default Header;