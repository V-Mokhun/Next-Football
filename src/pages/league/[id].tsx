import { pageModel } from "@/pages-models/index";
import { IClientViewer } from "@/shared/api";
import { withSessionSsr } from "@/shared/lib";
import { useGate } from "effector-react";
import { NextPage } from "next";
import React from "react";

interface LeagueProps {
  viewer: IClientViewer | null;
}

const League: NextPage<LeagueProps> = ({ viewer }) => {
  useGate(pageModel.PageGate, viewer);

  return <div>League</div>;
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        viewer: req.session.viewer,
      },
    };
  }
);

export default League;
