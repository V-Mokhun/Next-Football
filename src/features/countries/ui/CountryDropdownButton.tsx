
import { AccordionButton, AccordionIcon, Text } from "@chakra-ui/react";
import React from "react";

interface CountryDropdownButtonProps {
  name: string; 
	onClick: () => void
}

export const CountryDropdownButton: React.FC<CountryDropdownButtonProps> = ({ name, onClick }) => {
  return (
    <AccordionButton onClick={onClick}>
      <Text size="xs" flex="1" textAlign="left">
        {name}
      </Text>
      <AccordionIcon />
    </AccordionButton>
  );
};
