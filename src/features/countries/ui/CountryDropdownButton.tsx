
import { AccordionButton, AccordionIcon, Text } from "@chakra-ui/react";
import React from "react";

interface CountryDropdownButtonProps {
  name: string; 
	onClick: () => void
}

export const CountryDropdownButton: React.FC<CountryDropdownButtonProps> = ({ name, onClick }) => {
  return (
    <AccordionButton _hover={{
      textDecoration: "underline"
    }}  p={1} onClick={onClick}>
      <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" size="xs" flex="1" textAlign="left">
        {name}
      </Text>
      <AccordionIcon />
    </AccordionButton>
  );
};
