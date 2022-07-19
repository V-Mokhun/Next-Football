import { League } from "@/shared/api";
import { Accordion, Button } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React, { useState } from "react";
import { countriesModel } from "..";
import { CountryDropdownItem } from "./CountryDropdownItem";

interface CountriesDropdownProps {
  FavoriteComponent: React.ElementType<{
    data: League;
    size: "normal" | "small";
  }>;
}

export const CountriesDropdown: React.FC<CountriesDropdownProps> = ({
  FavoriteComponent,
}) => {
  const countries = useStore(countriesModel.$countries);
  const [showCountries, setShowCountries] = useState(false);

  return (
    <Accordion allowMultiple>
      {countries?.slice(0, 20)?.map(({ country }) => (
        <CountryDropdownItem
          key={country.name}
          country={country}
          FavoriteComponent={FavoriteComponent}
        />
      ))}

      {showCountries ? (
        countries
          ?.slice(20)
          ?.map(({ country }) => (
            <CountryDropdownItem
              key={country.name}
              country={country}
              FavoriteComponent={FavoriteComponent}
            />
          ))
      ) : (
        <Button mt={2} w="100%" onClick={() => setShowCountries(true)} variant="link">
          Show all countries
        </Button>
      )}
    </Accordion>
  );
};
