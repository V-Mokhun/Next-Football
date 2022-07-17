import { pageModel } from "@/pages-models/index";
import { IClientViewer } from "@/shared/api";
import { withSessionSsr } from "@/shared/lib";
import { useGate } from "effector-react";
import { NextPage } from "next";

interface TeamProps {
  viewer: IClientViewer | null;
}

const Team: NextPage<TeamProps> = ({ viewer }) => {
  useGate(pageModel.PageGate, viewer);

  return <div>Team</div>;
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        viewer: req.session.viewer || null,
      },
    };
  }
);

export default Team;
