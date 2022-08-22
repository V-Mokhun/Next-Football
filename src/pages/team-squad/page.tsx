import { TeamHeader, TeamSquad } from "@/entities/team";
import { viewerModel } from "@/entities/viewer";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { useStore } from "effector-react";
import React from "react";

interface TeamSquadPageProps {}

export const TeamSquadPage: React.FC<TeamSquadPageProps> = ({}) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  return (
    <>
      <TeamHeader
        FavoriteComponent={isAuthenticated ? FavoriteTeamButton : null}
      />
      <TeamSquad />
    </>
  );
};
