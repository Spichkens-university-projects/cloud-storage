import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { useActions } from "../../../hooks/useActions";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Header.module.scss";


const Header: FC<PropsWithChildren> = ({}) => {

  const { user } = useAuth();
  const { logout } = useActions();
  const { pathname } = useRouter();

  const isUserLogedIn = user;
  const isUserOnAuthPage = pathname === "signin";

  const onLogout = () => {
    logout()
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href={"/"} className={styles.logo}>
          E-Storage
        </Link>
        {isUserLogedIn
          ?
          <div className={'flex flex-row gap-5'}>
            <h3>{user.id}</h3>
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