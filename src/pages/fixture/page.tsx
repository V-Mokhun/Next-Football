import { SingleFixtureHeader, SingleFixtureReview } from "@/entities/fixture";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import React from "react";

interface FixturePageProps {}

export const FixturePage: React.FC<FixturePageProps> = ({}) => {
  return (
    <>
      <SingleFixtureHeader FavoriteComponent={FavoriteTeamButton} />
      <SingleFixtureReview />
    </>
  );
};
