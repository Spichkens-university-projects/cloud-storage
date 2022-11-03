import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Header.module.scss";

interface Props {

}

const Header: FC<PropsWithChildren<Props>> = ({}) => {

  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href={"/"} className={styles.logo}>
          E-Storage
        </Link>
        {user
          ? <h3>{user.id}</h3>
          : <Link href={"/signin"} className={styles.signButton}>Войти</Link>
        }
      </div>
    </header>
  );
};

export default Header;