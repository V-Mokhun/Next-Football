import { Layout } from "@/app/Layout";
import { FixturePage, fixturePageModel } from "@/pages/fixture";
import { appStarted, createGSP } from "@/pages/shared";
import { NextPageWithLayout } from "@/shared/lib";
import { GetStaticPaths } from "next";
import { usePageEvent } from "nextjs-effector";
import { ReactElement } from "react";

interface FixtureProps {}

const Fixture: NextPageWithLayout<FixtureProps> = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <FixturePage />;
};

Fixture.getLayout = (page: ReactElement) => (
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
  pageEvent: fixturePageModel.pageStarted,
  async customize() {
    return { props: {}, revalidate: 60 };
  },
});

export default Fixture;
