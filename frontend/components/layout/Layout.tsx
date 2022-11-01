import { FC, PropsWithChildren } from "react";
import Header from "./header/Header";
import styles from "./Layout.module.scss"

interface Props {

}

const Layout: FC<PropsWithChildren<Props>> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <main className={styles.main}>
        <div className={styles.filesWindow}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;