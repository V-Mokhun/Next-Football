import { HomePage, homePageModel } from "@/pages/home";
import { appStarted, createGIP } from "@/pages/shared";
import type { NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  usePageEvent(appStarted, { runOnce: true })

  return (
    <HomePage />
  );
};

// Home.getInitialProps = createGIP({
//   pageEvent: homePageModel.pageStarted,
// });

export default Home;
