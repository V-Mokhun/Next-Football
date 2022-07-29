import { LeagueHeader } from "@/entities/league";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { LeagueMatches } from "@/widgets/league-matches";
import React from "react";

interface LeaguePageProps {}

export const LeaguePage: React.FC<LeaguePageProps> = ({}) => {
  return (
    <>
      <LeagueHeader FavoriteComponent={FavoriteLeagueButton} />
      <LeagueMatches />
    </>
  );
};
