import { PageGate } from "@/pages-models/index";
import { IClientUser } from "@/shared/api";
import { withSessionSsr } from "@/shared/lib";
import { useGate } from "effector-react";
import { NextPage } from "next";
import React from "react";

// interface LeaguePageProps {}

// const LeaguePage: NextPage<LeaguePageProps> = ({}) => {
//   return <div>1</div>;
// };

// export default LeaguePage;

interface LeagueProps {
  user: IClientUser | null;
}

const League: NextPage<LeagueProps> = ({ user }) => {
  useGate(PageGate, user);

  return <div>League</div>;
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        user: req.session.user,
      },
    };
  }
);

export default League;
