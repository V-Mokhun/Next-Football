import { leagueModel } from "@/entities/league";
import { LeaguePage, leaguePageModel } from "@/pages/league";
import { appStarted, createGSP } from "@/pages/shared";
import { rapidApi } from "@/shared/api";
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

    if (!params || !params.id) {
      return {
        notFound: true,
      };
    }

    const id = params.id as string;
    const intId = parseInt(id, 10);

    // const { response } = await rapidApi.leaguesApi.getLeagues({
    //   id: intId,
    //   current: true,
    // });
    // const [league] = response;

    // if (!league) {
    //   return {
    //     notFound: true,
    //   };
    // }

    // leagueModel.leagueSet(league);

    return {
      props: {},
      revalidate: 60,
    };
  },
});

export default League;
