import { appStarted, createGSP } from "@/pages/shared";
import { TeamPage, teamPageModel } from "@/pages/team";
import { GetStaticPaths, NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

interface TeamProps {}

const Team: NextPage<TeamProps> = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <TeamPage />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const { response } = await rapidApi.teamsApi.getTeams({});

  // const paths = response.map(({ team }) => ({
  //   params: { id: String(team.id) },
  // }));
  const paths: any[] = [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: teamPageModel.pageStarted,
  async customize() {
    return { props: {}, revalidate: 600 };
  },
});

export default Team;
