import { Accordion, AccordionItem, AccordionPanel } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { countriesModel } from "..";
import { CountryDropdownButton } from "./CountryDropdownButton";

interface CountryDropdownProps {
  countryLeagues: React.ReactElement[] | React.ReactElement;
}

export const CountryDropdown: React.FC<CountryDropdownProps> = ({
  countryLeagues,
}) => {
  const countryButtonClicked = useEvent(countriesModel.countryButtonClicked);
  const countries = useStore(countriesModel.$countries);

  return (
    <Accordion allowMultiple>
      {countries?.map(({ country }) => (
        <AccordionItem key={country.code}>
          <CountryDropdownButton
            onClick={() => {
              countryButtonClicked(country.code);
            }}
            name={country.name}
          />
          <AccordionPanel>{countryLeagues}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
