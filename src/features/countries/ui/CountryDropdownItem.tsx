import { viewerModel } from "@/entities/viewer";
import { Country, League } from "@/shared/api";
import { LEAGUE_ROUTE } from "@/shared/lib";
import { SidebarItem } from "@/shared/ui";
import {
  AccordionItem,
  AccordionPanel,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { countriesModel } from "..";
import { CountryDropdownButton } from "./CountryDropdownButton";

interface CountryDropdownItemProps {
  country: Country;
  FavoriteComponent: React.ElementType<{
    data: League;
    size: "normal" | "small";
    isAbsolute?: boolean;
  }>;
}

export const CountryDropdownItem: React.FC<CountryDropdownItemProps> = ({
  country,
  FavoriteComponent,
}) => {
  const router = useRouter();
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);

  const countryButtonClicked = useEvent(countriesModel.countryButtonClicked);
  const countryLeaguesFetching = useStore(
    countriesModel.$countryLeaguesFetching
  );
  const countryLeagues = useStore(countriesModel.$countryLeagues);

  const findCountryLeagues = useCallback(
    (code: string) => {
      return countryLeagues.find((country) => country.code === code)?.leagues;
    },
    [countryLeagues]
  );

  return (
    <AccordionItem key={country.name}>
      <CountryDropdownButton
        onClick={() => {
          countryButtonClicked(country.code);
        }}
        name={country.name}
      />
      <AccordionPanel px={0} pt={0} pb={2}>
        {countryLeaguesFetching?.code === country.code &&
        countryLeaguesFetching.loading === true ? (
          <Stack>
            <Skeleton height="15px" w="70%" borderRadius="5px" />
            <Skeleton height="15px" w="100%" borderRadius="5px" />
            <Skeleton height="15px" w="70%" borderRadius="5px" />
            <Skeleton height="15px" w="100%" borderRadius="5px" />
            <Skeleton height="15px" w="70%" borderRadius="5px" />
            <Skeleton height="15px" w="100%" borderRadius="5px" />
          </Stack>
        ) : (
          findCountryLeagues(country.code)?.map((league) => (
            <SidebarItem
              key={league.id}
              id={league.id}
              logo={league.logo}
              name={league.name}
              noImage={true}
              onClick={() => {
                router.push(`${LEAGUE_ROUTE}/${league.id}`);
              }}
              favoriteComponent={
                isAuthenticated ? (
                  <FavoriteComponent
                    isAbsolute={true}
                    data={league}
                    size="small"
                  />
                ) : null
              }
            />
          ))
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};
