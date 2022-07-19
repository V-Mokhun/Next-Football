import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface SidebarCountriesProps {}

export const SidebarCountries: React.FC<SidebarCountriesProps> = ({}) => {
  return (
    <Box w="100%">
      <Heading as="h3" size="sm">
        Countries
      </Heading>
    </Box>
  );
};
