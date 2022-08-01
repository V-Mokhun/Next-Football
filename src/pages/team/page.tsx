import { TeamHeader, teamModel } from "@/entities/team";
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

  return (
    <>
      <TeamHeader FavoriteComponent={FavoriteTeamButton} />
      {todayMatches && Object.values(todayMatches)[0]?.length > 0 && (
        <TeamTodayMatches />
      )}
      <TeamLastMatches />
      <TeamNextMatches />
    </>
  );
};
