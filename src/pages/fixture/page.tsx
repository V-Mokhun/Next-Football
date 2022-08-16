import { SingleFixtureHeader, SingleFixtureReview } from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { useStore } from "effector-react";
import React from "react";

interface FixturePageProps {}

export const FixturePage: React.FC<FixturePageProps> = ({}) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  return (
    <>
      <SingleFixtureHeader
        FavoriteComponent={isAuthenticated ? FavoriteTeamButton : null}
      />
      <SingleFixtureReview />
    </>
  );
};
