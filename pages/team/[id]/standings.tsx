import { appStarted, createGSP } from "@/pages/shared";
import {
  TeamStandingsPage,
  teamStandingsPageModel,
} from "@/pages/team-standings";
import type { GetStaticPaths, NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

const Standings: NextPage = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <TeamStandingsPage />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: teamStandingsPageModel.pageStarted,
  async customize() {
    return {
      revalidate: 600,
      props: {},
    };
  },
});

export default Standings;
