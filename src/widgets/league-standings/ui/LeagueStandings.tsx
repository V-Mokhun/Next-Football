import { leagueModel } from "@/entities/league";
import { Standings } from "@/shared/ui";
import { useStore } from "effector-react";
import React from "react";

interface LeagueStandingsProps {}

export const LeagueStandings: React.FC<LeagueStandingsProps> = ({}) => {
  const standingsLoading = useStore(leagueModel.$leagueStandingsLoading);
  const standingsError = useStore(leagueModel.$leagueStandingsError);

  return (
    <Standings
      loading={standingsLoading}
      error={standingsError}
      store={leagueModel.$leagueStandings}
    />
  );
};
