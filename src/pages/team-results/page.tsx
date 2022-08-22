import { TeamHeader } from "@/entities/team";
import { viewerModel } from "@/entities/viewer";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { TeamLastMatches } from "@/widgets/team-matches";
import { useStore } from "effector-react";
import React from "react";

interface TeamResultsPageProps {}

export const TeamResultsPage: React.FC<TeamResultsPageProps> = ({}) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  return (
    <>
      <TeamHeader
        FavoriteComponent={isAuthenticated ? FavoriteTeamButton : null}
      />
      <TeamLastMatches isMatchesPage={true} />
    </>
  );
};
