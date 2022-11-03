import { FC, PropsWithChildren } from "react";
import SignUp from "../../app/components/pages/signup/SignUp";

const SignUpPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SignUp/>
  );
};

export default SignUpPage;