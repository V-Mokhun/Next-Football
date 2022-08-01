import { TeamHeader } from "@/entities/team";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { TeamNextMatches } from "@/widgets/team-matches";
import React from "react";

interface TeamMatchesPageProps {}

export const TeamMatchesPage: React.FC<TeamMatchesPageProps> = ({}) => {
  return (
    <>
      <TeamHeader FavoriteComponent={FavoriteTeamButton} />
      <TeamNextMatches isMatchesPage={true} />
    </>
  );
};
