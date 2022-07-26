import { FixtureLeague, FixtureMatch, fixtureModel } from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { useList, useStore } from "effector-react";
import React from "react";

interface MatchesProps {}

export const Matches: React.FC<MatchesProps> = ({}) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  const viewerFavoriteLeagues = useStore(viewerModel.$viewerFavoriteLeagues);
  const list = useList(fixtureModel.$fixtures, {
    keys: [viewerFavoriteLeagues],
    fn: (fixture) => {
      const isFavoriteLeague = viewerFavoriteLeagues.find(
        (league) => league.id === fixture.league.id
      );

      return (
        <FixtureLeague
          isFavorite={Boolean(isFavoriteLeague)}
          FavoriteComponent={isAuthenticated ? FavoriteLeagueButton : null}
          league={fixture.league}
          matches={<FixtureMatch fixtureData={fixture} />}
        />
      );
    },
  });

  return list;
};
