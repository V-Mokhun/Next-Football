import { LeagueResponse, rapidApi } from "@/shared/api";
import { Event } from "effector";
import { ParsedUrlQuery } from "querystring";

export const setLeague = async (
  params: ParsedUrlQuery | undefined,
  leagueSet: Event<LeagueResponse | null>
) => {
  if (!params || !params.id) {
    return {
      notFound: true,
    };
  }

  const id = params.id as string;
  const intId = parseInt(id, 10);

  const { response } = await rapidApi.leaguesApi.getLeagues({
    id: intId,
    current: true,
  });
  const [league] = response;

  if (!league) {
    return {
      notFound: true,
    };
  }

  leagueSet(league);

  return league;
};
