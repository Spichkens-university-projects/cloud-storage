import Head from "next/head";
import { FC, PropsWithChildren } from "react";

interface Props {
  title: string
}

const Headers: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Headers;