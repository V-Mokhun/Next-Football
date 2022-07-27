import { HomePage, homePageModel } from "@/pages/home";
import { createGIP } from "@/pages/shared";
import type { NextPage } from "next";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  return <HomePage />;
};

Home.getInitialProps = createGIP({
  pageEvent: homePageModel.pageStarted,
});

export default Home;
