import { appStarted, createGSP } from "@/pages/shared";
import { TeamMatchesPage, teamMatchesPageModel } from "@/pages/team-matches";
import type { GetStaticPaths, NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

const Matches: NextPage = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <TeamMatchesPage />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: teamMatchesPageModel.pageStarted,
  async customize() {
    return {
      revalidate: 600,
      props: {},
    };
  },
});

export default Matches;
