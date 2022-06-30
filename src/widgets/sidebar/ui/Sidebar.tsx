import { StarIcon } from "@chakra-ui/icons";
import { Box, Heading, StackDivider, VStack } from "@chakra-ui/react";
import React from "react";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <aside>
      <VStack
        divider={<StackDivider borderColor="gray.900" />}
        spacing={4}
        alignItems="flex-start">
        <Box>
          <Heading display="flex" alignItems="center" gap={2} as="h3" size="sm">
            <StarIcon /> <span>My leagues</span>
          </Heading>
        </Box>
        <Box>
          <Heading display="flex" alignItems="center" gap={2} as="h3" size="sm">
            <StarIcon /> <span>My teams</span>
          </Heading>
        </Box>
        <Box>
          <Heading as="h3" size="sm">
            Countries
          </Heading>
        </Box>
      </VStack>
    </aside>
  );
};
