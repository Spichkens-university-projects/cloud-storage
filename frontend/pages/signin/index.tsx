import SignIn from "../../app/components/pages/signin/SignIn";
import { PrivateNextPage } from "../../app/providers/private-route.interface";

const SignInPage: PrivateNextPage = ({}) => {
  return <SignIn />;
};

SignInPage.isPrivatePage = false;

export default SignIn;