import Home from "../app/components/pages/home/Home";
import { PrivateNextPage } from "../app/providers/private-route.interface";

const HomePage: PrivateNextPage = () => {
  return <Home/>
}

HomePage.isPrivatePage = true

export default HomePage
