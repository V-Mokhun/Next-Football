import { HomePage, homePageModel } from "@/pages/home";
import { createGIP } from "@/pages/shared";
import type { NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  usePageEvent(homePageModel.pageStarted, { runOnce: false });

  return <HomePage />;
};

Home.getInitialProps = createGIP({});

// export const getServerSideProps = createGSSP({
//   pageEvent: homePageModel.pageStarted,
// });

export default Home;
