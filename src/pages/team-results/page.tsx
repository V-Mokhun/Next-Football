import { TeamHeader } from "@/entities/team";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { TeamLastMatches } from "@/widgets/team-matches";
import React from "react";

interface TeamResultsPageProps {}

export const TeamResultsPage: React.FC<TeamResultsPageProps> = ({}) => {
  return (
    <>
      <TeamHeader FavoriteComponent={FavoriteTeamButton} />
      <TeamLastMatches isMatchesPage={true} />
    </>
  );
};
