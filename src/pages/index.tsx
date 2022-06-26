import { IClientUser } from "@/shared/api";
import { withSessionSsr } from "@/shared/lib";
import { useGate } from "effector-react";
import { PageGate } from "@/pages-models/index";
import type { NextPage } from "next";

interface HomeProps {
  user: IClientUser | null;
}

const Home: NextPage<HomeProps> = ({ user }) => {
  useGate(PageGate, user);

  return <div>Home</div>;
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

export default Home;
