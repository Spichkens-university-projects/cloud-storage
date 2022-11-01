import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import styles from "./Header.module.scss"

interface Props {

}

const Header: FC<PropsWithChildren<Props>> = ({}) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href={'/'} className={styles.logo}>
          E-Storage
        </Link>
        <Link href={'/signin'} className={styles.signButton}>Войти</Link>
      </div>
    </header>
  );
};

export default Header;