import { TeamHeader } from "@/entities/team";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import React from "react";

interface TeamTransfersPageProps {}

export const TeamTransfersPage: React.FC<TeamTransfersPageProps> = ({}) => {
  return (
    <>
      <TeamHeader FavoriteComponent={FavoriteTeamButton} />
    </>
  );
};
