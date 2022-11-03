import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { TypeComponentAuthFields } from "./private-route.interface";

const CheckAuth: FC<PropsWithChildren<TypeComponentAuthFields>> = ({ children, Component: {isPrivatePage} }) => {
  const {user, isLoading} = useAuth()
  const {replace, pathname} = useRouter()

  const Children = () => <>{children}</>

  if (isLoading) return null
  if (user) return <Children/>
  if (isPrivatePage) pathname !== '/signin' && replace('/signin')

  return (
    <div>
      CheckAuth
    </div>
  );
};

export default CheckAuth;