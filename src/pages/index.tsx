import { IClientViewer } from "@/shared/api";
import { withSessionSsr } from "@/shared/lib";
import { useGate } from "effector-react";
import { pageModel } from "@/pages-models/index";
import type { NextPage } from "next";

interface HomeProps {
  viewer: IClientViewer | null;
}

const Home: NextPage<HomeProps> = ({ viewer }) => {
  useGate(pageModel.PageGate, viewer);

  return <div>Home</div>;
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        viewer: req.session.viewer ? req.session.viewer : null,
      },
    };
  }
);

export default Home;
