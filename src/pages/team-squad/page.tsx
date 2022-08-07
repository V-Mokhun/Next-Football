import { TeamHeader, TeamSquad } from "@/entities/team";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import React from "react";

interface TeamSquadPageProps {}

export const TeamSquadPage: React.FC<TeamSquadPageProps> = ({}) => {
  return (
    <>
      <TeamHeader FavoriteComponent={FavoriteTeamButton} />
      <TeamSquad />
    </>
  );
};
