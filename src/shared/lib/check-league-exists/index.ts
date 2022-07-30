import { rapidApi } from "@/shared/api";
import { ParsedUrlQuery } from "querystring";

export const checkLeagueExists = async (params: ParsedUrlQuery | undefined) => {
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

  return league;
};
