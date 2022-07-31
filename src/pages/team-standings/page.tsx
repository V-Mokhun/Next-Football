import { TeamHeader } from "@/entities/team";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import React from "react";

interface TeamStandingsPageProps {}

export const TeamStandingsPage: React.FC<TeamStandingsPageProps> = ({}) => {
  return (
    <>
      <TeamHeader FavoriteComponent={FavoriteTeamButton} />
    </>
  );
};
