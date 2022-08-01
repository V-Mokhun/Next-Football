import { appStarted, createGSP } from "@/pages/shared";
import { TeamResultsPage, teamResultsPageModel } from "@/pages/team-results";
import type { GetStaticPaths, NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

const Results: NextPage = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <TeamResultsPage />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: teamResultsPageModel.pageStarted,
  async customize() {
    return {
      revalidate: 600,
      props: {},
    };
  },
});

export default Results;
