import { TeamHeader } from "@/entities/team";
import { viewerModel } from "@/entities/viewer";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { TeamNextMatches } from "@/widgets/team-matches";
import { useStore } from "effector-react";
import React from "react";

interface TeamMatchesPageProps {}

export const TeamMatchesPage: React.FC<TeamMatchesPageProps> = ({}) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  return (
    <>
      <TeamHeader
        FavoriteComponent={isAuthenticated ? FavoriteTeamButton : null}
      />
      <TeamNextMatches isMatchesPage={true} />
    </>
  );
};
