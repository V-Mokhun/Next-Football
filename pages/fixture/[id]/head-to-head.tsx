import { Layout } from "@/app/Layout";
import {
  FixtureHeadToHeadPage,
  fixtureHeadToHeadPageModel,
} from "@/pages/fixture-head-to-head";
import { appStarted, createGSP } from "@/pages/shared";
import { NextPageWithLayout } from "@/shared/lib";
import { GetStaticPaths } from "next";
import { usePageEvent } from "nextjs-effector";
import { ReactElement } from "react";

interface FixtureHeadToHeadProps {}

const FixtureHeadToHead: NextPageWithLayout<FixtureHeadToHeadProps> = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <FixtureHeadToHeadPage />;
};

FixtureHeadToHead.getLayout = (page: ReactElement) => (
  <Layout
    isWhiteContainer={true}
    containerProps={{
      maxW: "container.md",
      borderBottomRightRadius: "8px",
      borderBottomLeftRadius: "8px",
      pb: 2,
    }}
    showSidebar={false}
  >
    {page}
  </Layout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: fixtureHeadToHeadPageModel.pageStarted,
  async customize() {
    return { props: {}, revalidate: 60 };
  },
});

export default FixtureHeadToHead;
