import { LeagueHeader } from "@/entities/league";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { LeagueMatches } from "@/widgets/league-matches";
import React from "react";

interface LeagueMatchesPageProps {}

export const LeagueMatchesPage: React.FC<LeagueMatchesPageProps> = ({}) => {
  return (
    <>
      <LeagueHeader FavoriteComponent={FavoriteLeagueButton} />
      <LeagueMatches />
    </>
  );
};
