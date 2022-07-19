import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";

interface SidebarItemProps {
  onClick: () => void;
  id: number;
  logo: string;
  name: string;
  favoriteComponent: React.ReactElement | null;
  noImage?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  favoriteComponent,
  id,
  logo,
  name,
  onClick,
  noImage = false,
}) => {
  return (
    <Flex
      key={id}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      p={1}
      borderRadius={10}
     position="relative" 
     pr={8}
      >
      <>
        <Flex
          cursor="pointer"
          alignItems="center"
          gap={1}
          onClick={onClick}
          w="100%"
          _hover={{
            textDecoration: "underline",
          }}>
          {noImage ? null : (
            <Box flex="0 0 18px">
              <Image src={logo} alt={name} width={18} height={18} />
            </Box>
          )}
          <Heading overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" as="p" size="xs">
            {name}
          </Heading>
        </Flex>
        {favoriteComponent}
      </>
    </Flex>
  );
};
