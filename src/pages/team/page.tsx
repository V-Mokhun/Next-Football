import { TeamHeader } from "@/entities/team";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import React from "react";

interface TeamPageProps {}

export const TeamPage: React.FC<TeamPageProps> = ({}) => {
  return (
    <>
      <TeamHeader FavoriteComponent={FavoriteTeamButton} />
    </>
  );
};
