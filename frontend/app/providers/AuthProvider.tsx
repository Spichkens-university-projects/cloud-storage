import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useAuth } from "../hooks/useAuth";
import { TypeComponentAuthFields } from "./private-route.interface";

const DynamicCheckAuth = dynamic(() => import("./CheckAuth"), {
  ssr: false
});

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({ children, Component: { isPrivatePage } }) => {

  const { refresh } = useActions();
  const { user } = useAuth();
  const { replace } = useRouter();

  const Children = () => <>{children}</>;

  useEffect(() => {
    refresh(null);
    replace("/");
  }, []);


  if (user) return <Children />;


  return !isPrivatePage ? <>{children}</> :
    <DynamicCheckAuth Component={{ isPrivatePage }}>{children}</DynamicCheckAuth>;
};

export default AuthProvider;