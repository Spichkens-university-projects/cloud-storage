import React, { FC, PropsWithChildren, useRef } from "react";
import { AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai";
import styles from "./Nav.module.scss";

interface Props {
  onOpen: () => void;
}

const Nav: FC<PropsWithChildren<Props>> = ({ children, onOpen }) => {

  const fileRef = useRef<HTMLInputElement>(null);

  const pickFile = (e: any) => {
    const file: File = e.target.files[0];
    let formData = new FormData();
    formData.append(file.name, file);
  };

  return (
    <header className={styles.header}>
      <AiFillFolderAdd color={"grey"} size={42} onClick={onOpen} className={styles.icon} title={"Создать папку"} />
      <AiFillFileAdd color={"grey"} size={42} className={styles.icon} onClick={() => fileRef?.current?.click()} />
      <input
        ref={fileRef}
        onChange={pickFile}
        hidden={true}
        type={"file"}
        title={"Загрузить файл"}
        className={"w-full h-full"} />

    </header>
  );

};

export default Nav;