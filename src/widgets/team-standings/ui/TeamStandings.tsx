import { teamModel } from "@/entities/team";
import { Standings } from "@/shared/ui";
import { useStore } from "effector-react";
import React from "react";

interface TeamStandingsProps {}

export const TeamStandings: React.FC<TeamStandingsProps> = ({}) => {
  const standingsLoading = useStore(teamModel.$teamStandingsLoading);
  const standingsError = useStore(teamModel.$teamStandingsError);

  return (
    <Standings
      loading={standingsLoading}
      error={standingsError}
      store={teamModel.$teamStandings}
    />
  );
};
