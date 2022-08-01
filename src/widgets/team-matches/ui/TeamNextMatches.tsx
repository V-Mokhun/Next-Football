import { teamModel } from "@/entities/team";
import { MATCHES_ROUTE } from "@/shared/lib";
import { useStore } from "effector-react";
import React from "react";
import { TeamMatches } from "./TeamMatches";

interface TeamNextMatchesProps {}

export const TeamNextMatches: React.FC<TeamNextMatchesProps> = ({}) => {
  const loading = useStore(teamModel.$nextMatchesLoading);
  const error = useStore(teamModel.$nextMatchesError);

  return (
    <TeamMatches
      error={error}
      loading={loading}
      store={teamModel.$nextMatches}
      title="Next matches"
      route={MATCHES_ROUTE}
    />
  );
};
