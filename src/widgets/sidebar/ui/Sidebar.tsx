import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  StackDivider,
  useColorMode,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { SidebarLeagues } from "./SidebarLeagues";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { colorMode } = useColorMode();
  // const openModal

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
        <Box w="100%">
          <Heading display="flex" alignItems="center" gap={2} as="h3" size="sm">
            <StarIcon /> <span>My teams</span>
          </Heading>
        </Box>
        <Box w="100%">
          <Heading as="h3" size="sm">
            Countries
          </Heading>
        </Box>
      </VStack>
    </aside>
  );
};
