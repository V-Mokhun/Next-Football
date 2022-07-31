import { TeamHeader } from "@/entities/team";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import React from "react";

interface TeamMatchesPageProps {}

export const TeamMatchesPage: React.FC<TeamMatchesPageProps> = ({}) => {
  return (
    <>
      <TeamHeader FavoriteComponent={FavoriteTeamButton} />
    </>
  );
};
