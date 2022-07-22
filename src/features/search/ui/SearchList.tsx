import { League, Team } from "@/shared/api";
import { LEAGUE_ROUTE, TEAM_ROUTE } from "@/shared/lib";
import { Flex, Spinner, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";
import { searchModel } from "..";
import { SearchItem } from "./SearchItem";

interface SearchListProps {
  debouncedSearchValue: string;
  FavoriteLeagueComponent: React.FC<{ data: League; size: "normal" | "small" }>;
  FavoriteTeamComponent: React.FC<{ data: Team; size: "normal" | "small" }>;
}

export const SearchList: React.FC<SearchListProps> = ({
  debouncedSearchValue,
  FavoriteLeagueComponent,
  FavoriteTeamComponent,
}) => {
  const teams = useStore(searchModel.$teams);
  const leagues = useStore(searchModel.$leagues);
  const loading = useStore(searchModel.$searchLoading);
  const searchMode = useStore(searchModel.$searchMode);

  let body = null;

  if (loading) {
    body = (
      <Flex justifyContent="center" mt={2}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (searchMode === "leagues" && leagues?.length > 0) {
    body = (
      <VStack mt={3} align="start" divider={<StackDivider />} spacing={2}>
        {leagues?.map(({ country, league }) => (
          <SearchItem
            favoriteComponent={
              <FavoriteLeagueComponent data={league} size="normal" />
            }
            key={league.id}
            logo={league.logo}
            name={league.name}
            redirectTo={`${LEAGUE_ROUTE}/${league.id}`}
            country={country.name}
          />
        ))}
      </VStack>
    );
  }

  if (searchMode === "teams" && teams?.length > 0) {
    body = (
      <VStack mt={3} align="start" divider={<StackDivider />} spacing={2}>
        {teams?.map(({ team }) => (
          <SearchItem
            favoriteComponent={
              <FavoriteTeamComponent data={team} size="normal" />
            }
            key={team.id}
            logo={team.logo}
            name={team.name}
            redirectTo={`${TEAM_ROUTE}/${team.id}`}
            country={team.country}
          />
        ))}
      </VStack>
    );
  }

  if (
    teams.length <= 0 &&
    leagues.length <= 0 &&
    debouncedSearchValue.trim().length >= 3 &&
    !loading
  ) {
    body = (
      <Text mt={2} textAlign="left">
        No results found.
      </Text>
    );
  }

  return body;
};
