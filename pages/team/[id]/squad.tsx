import { appStarted, createGSP } from "@/pages/shared";
import { TeamSquadPage, teamSquadPageModel } from "@/pages/team-squad";
import type { GetStaticPaths, NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

const Squad: NextPage = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <TeamSquadPage />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: teamSquadPageModel.pageStarted,
  async customize() {
    return {
      revalidate: 600,
      props: {},
    };
  },
});

export default Squad;
