import { TeamHeader, teamModel } from "@/entities/team";
import { viewerModel } from "@/entities/viewer";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import {
  TeamLastMatches,
  TeamNextMatches,
  TeamTodayMatches,
} from "@/widgets/team-matches";
import { useStore } from "effector-react";
import React from "react";

interface TeamPageProps {}

export const TeamPage: React.FC<TeamPageProps> = ({}) => {
  const todayMatches = useStore(teamModel.$todayMatches);
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);

  return (
    <>
      <TeamHeader
        FavoriteComponent={isAuthenticated ? FavoriteTeamButton : null}
      />
      {todayMatches && Object.values(todayMatches)[0]?.length > 0 && (
        <TeamTodayMatches />
      )}
      <TeamLastMatches />
      <TeamNextMatches />
    </>
  );
};
