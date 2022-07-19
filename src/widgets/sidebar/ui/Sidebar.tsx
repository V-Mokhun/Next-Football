import {
  Box,
  Heading,
  StackDivider,
  useColorMode,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { SidebarLeagues } from "./SidebarLeagues";
import { SidebarTeams } from "./SidebarTeams";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { colorMode } = useColorMode();

  return (
    <aside>
      <VStack
        divider={
          <StackDivider
            borderColor={colorMode === "dark" ? "gray.900" : "gray.200"}
          />
        }
        spacing={4}
        alignItems="flex-start">
        <SidebarLeagues />
        <SidebarTeams />
        <Box w="100%">
          <Heading as="h3" size="sm">
            Countries
          </Heading>
        </Box>
      </VStack>
    </aside>
  );
};
