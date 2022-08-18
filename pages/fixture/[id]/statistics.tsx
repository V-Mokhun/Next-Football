import { Layout } from "@/app/Layout";
import {
  FixtureStatisticsPage,
  fixtureStatisticsPageModel,
} from "@/pages/fixture-statistics";
import { appStarted, createGSP } from "@/pages/shared";
import { NextPageWithLayout } from "@/shared/lib";
import { GetStaticPaths } from "next";
import { usePageEvent } from "nextjs-effector";
import { ReactElement } from "react";

interface FixtureStatisticsProps {}

const FixtureStatistics: NextPageWithLayout<FixtureStatisticsProps> = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <FixtureStatisticsPage />;
};

FixtureStatistics.getLayout = (page: ReactElement) => (
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
  pageEvent: fixtureStatisticsPageModel.pageStarted,
  async customize() {
    return { props: {}, revalidate: 60 };
  },
});

export default FixtureStatistics;
