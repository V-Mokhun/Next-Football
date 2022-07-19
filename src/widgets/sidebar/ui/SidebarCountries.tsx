import { CountriesDropdown, countriesModel } from "@/features/countries";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { Box, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";

interface SidebarCountriesProps {}

export const SidebarCountries: React.FC<SidebarCountriesProps> = ({}) => {
  const countriesFetching = useStore(countriesModel.$countriesFetching);

  return (
    <Box w="100%">
      <Heading as="h3" size="sm" mb={3}>
        Countries
      </Heading>
      {countriesFetching ? (
        <Stack>
          <Skeleton height="20px" w="70%" borderRadius="5px" />
          <Skeleton height="20px" w="100%" borderRadius="5px" />
          <Skeleton height="20px" w="70%" borderRadius="5px" />
          <Skeleton height="20px" w="100%" borderRadius="5px" />
          <Skeleton height="20px" w="70%" borderRadius="5px" />
          <Skeleton height="20px" w="100%" borderRadius="5px" />
        </Stack>
      ) : (
        <CountriesDropdown FavoriteComponent={FavoriteLeagueButton} />
      )}
    </Box>
  );
};
