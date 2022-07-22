import { LeaguePage } from "@/pages/league";
import { appStarted } from "@/pages/shared";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { usePageEvent } from "nextjs-effector";

interface LeagueProps {}

const League: NextPage<LeagueProps> = () => {
  usePageEvent(appStarted, { runOnce: true });

  return <LeaguePage />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const { response } = await rapidApi.leaguesApi.getLeagues({});

  // const paths = response.map(({ league }) => ({
  //   params: { id: String(league.id) },
  // }));
  const paths: any[] = []

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  LeagueProps,
  { id: string }
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { id } = params;
  const intId = parseInt(id, 10);

  // const { response } = await rapidApi.leaguesApi.getLeagues({ id: intId });
  // const [leagueObj] = response;

  // if (!leagueObj) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {},
    revalidate: 60,
  };
};

export default League;
