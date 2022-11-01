import { FC, PropsWithChildren } from "react";
import SignUp from "../../components/pages/signup/SignUp";

interface Props {

}

const SignUpPage: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <SignUp/>
  );
};

export default SignUpPage;