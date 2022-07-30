import {
  LeagueMatchesPage,
  leagueMatchesPageModel,
} from "@/pages/league-matches";
import { appStarted, createGSP } from "@/pages/shared";
import { checkLeagueExists } from "@/shared/lib";
import type { GetStaticPaths, NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

const Matches: NextPage = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <LeagueMatchesPage />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: leagueMatchesPageModel.pageStarted,
  async customize({ context }) {
    const params = context.params;

    return await checkLeagueExists(params);
  },
});

export default Matches;
