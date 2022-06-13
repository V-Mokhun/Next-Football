import { LEAGUE_ROUTE, TEAM_ROUTE } from "@/shared/lib";
import { Flex, Spinner, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";
import { searchModel } from "..";
import { SearchItem } from "./SearchItem";

interface SearchListProps {
  debouncedSearchValue: string;
}

export const SearchList: React.FC<SearchListProps> = ({
  debouncedSearchValue,
}) => {
  const teams = useStore(searchModel.$teams);
  const leagues = useStore(searchModel.$leagues);
  const loading = useStore(searchModel.$searchLoading);

  return loading ? (
    <Flex justifyContent="center" mt={2}>
      <Spinner size="xl" />
    </Flex>
  ) : (
    <>
      <VStack mt={3} align="start" divider={<StackDivider />} spacing={2}>
        {teams.length > 0 &&
          teams.map(({ team }) => (
            <SearchItem
              key={team.id}
              logo={team.logo}
              name={team.name}
              redirectTo={`${TEAM_ROUTE}/${team.id}`}
              country={team.country}
            />
          ))}

        {leagues.length > 0 &&
          leagues.map(({ country, league }) => (
            <SearchItem
              key={league.id}
              logo={league.logo}
              name={league.name}
              redirectTo={`${LEAGUE_ROUTE}/${league.id}`}
              country={country.name}
            />
          ))}
      </VStack>
      {teams.length <= 0 &&
        leagues.length <= 0 &&
        debouncedSearchValue.trim().length >= 3 && (
          <Text mt={2} textAlign="left">
            No results found.
          </Text>
        )}
    </>
  );
};
