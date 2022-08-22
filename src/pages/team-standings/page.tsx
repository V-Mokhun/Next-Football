import { TeamHeader } from "@/entities/team";
import { viewerModel } from "@/entities/viewer";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { TeamStandings } from "@/widgets/team-standings";
import { useStore } from "effector-react";
import React from "react";

interface TeamStandingsPageProps {}

export const TeamStandingsPage: React.FC<TeamStandingsPageProps> = ({}) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);

  return (
    <>
      <TeamHeader
        FavoriteComponent={isAuthenticated ? FavoriteTeamButton : null}
      />
      <TeamStandings />
    </>
  );
};
