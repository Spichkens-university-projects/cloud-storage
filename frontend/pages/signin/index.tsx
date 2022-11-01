import { FC, PropsWithChildren } from "react";
import SignIn from "../../components/pages/signin/SignIn";

interface Props {

}

const SignInPage: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <SignIn/>
  );
};

export default SignIn;