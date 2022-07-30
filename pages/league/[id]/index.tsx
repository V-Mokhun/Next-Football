import { leagueModel } from "@/entities/league";
import { LeaguePage, leaguePageModel } from "@/pages/league";
import { appStarted, createGSP } from "@/pages/shared";
import { setLeague } from "@/shared/lib";
import { GetStaticPaths, NextPage } from "next";
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
  const paths: any[] = [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = createGSP({
  pageEvent: leaguePageModel.pageStarted,
  async customize({ context }) {
    const params = context.params;

    // await setLeague(params, leagueModel.leagueSet);

    return {
      props: {},
      revalidate: 300,
    };
  },
});

export default League;
