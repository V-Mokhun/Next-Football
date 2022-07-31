import {
  LeagueStandingsPage,
  leagueStandingsPageModel,
} from "@/pages/league-standings";
import { appStarted, createGSP } from "@/pages/shared";
import type { GetStaticPaths, NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

const LeagueStandings: NextPage = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <LeagueStandingsPage />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: leagueStandingsPageModel.pageStarted,
  async customize() {
    return {
      revalidate: 600,
      props: {},
    };
  },
});

export default LeagueStandings;
