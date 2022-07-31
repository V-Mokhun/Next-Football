import { appStarted, createGSP } from "@/pages/shared";
import {
  TeamTransfersPage,
  teamTransfersPageModel,
} from "@/pages/team-transfers";
import type { GetStaticPaths, NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

const Transfers: NextPage = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <TeamTransfersPage />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: teamTransfersPageModel.pageStarted,
  async customize() {
    return {
      revalidate: 600,
      props: {},
    };
  },
});

export default Transfers;
