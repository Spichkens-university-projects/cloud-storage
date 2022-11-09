import {fileSlice} from "@/store/file/file.slice";
import {ROOT_PATH} from "@/types/file/file.interface";
import Link from "next/link";
import {useRouter} from "next/router";
import {FC, PropsWithChildren} from "react";
import {useDispatch} from "react-redux";
import {useActions} from "../../../hooks/useActions";
import {useAuth} from "../../../hooks/useAuth";
import {api} from "../../../store/api/api";
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

  const dispatch = useDispatch()

  const goToRootDir = () => {
    dispatch(fileSlice.actions.setPath({
      currentPath: `${ROOT_PATH}`,
      dirId: undefined
    }))
  }

  if (isLoading) return null;

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href={"/"} className={styles.logo} onClick={goToRootDir}>
          E-Storage
        </Link>
        {isUserLogedIn
          ?
          <div className={"flex flex-row items-center gap-5"}>
            <h1 className={styles.username}>{data?.name} {data?.surname}</h1>
            <button onClick={onLogout} className={styles.logoutButton}>Выйти</button>
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