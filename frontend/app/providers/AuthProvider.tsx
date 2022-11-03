import dynamic from "next/dynamic";
import { FC, PropsWithChildren } from "react";
import { TypeComponentAuthFields } from "./private-route.interface";

const DynamicCheckAuth = dynamic(() => import('./CheckAuth'), {
  ssr: false
})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({children, Component: {isPrivatePage}}) => {
  return !isPrivatePage ? <>{children}</> : <DynamicCheckAuth Component={{isPrivatePage}}>{children}</DynamicCheckAuth>
}

export default AuthProvider