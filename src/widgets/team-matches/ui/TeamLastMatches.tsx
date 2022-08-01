import { teamModel } from "@/entities/team";
import { RESULTS_ROUTE } from "@/shared/lib";
import { useStore } from "effector-react";
import React from "react";
import { TeamMatches } from "./TeamMatches";

interface TeamLastMatchesProps {}

export const TeamLastMatches: React.FC<TeamLastMatchesProps> = ({}) => {
  const loading = useStore(teamModel.$lastMatchesLoading);
  const error = useStore(teamModel.$lastMatchesError);

  return (
    <TeamMatches
      error={error}
      loading={loading}
      store={teamModel.$lastMatches}
      title="Last results"
      route={RESULTS_ROUTE}
    />
  );
};
