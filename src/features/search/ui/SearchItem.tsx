import { searchModalModel } from "@/entities/search";
import { viewerModel } from "@/entities/viewer";
import { ChakraImage } from "@/shared/ui";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import { useRouter } from "next/router";
import React from "react";

interface SearchItemProps {
  redirectTo: string;
  logo: string;
  name: string;
  country: string;
  favoriteComponent: React.ReactElement;
}

export const SearchItem: React.FC<SearchItemProps> = ({
  logo,
  name,
  country,
  redirectTo,
  favoriteComponent,
}) => {
  const router = useRouter();
  const searchItemClicked = useEvent(searchModalModel.searchItemClicked);
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);

  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      gap={3}
      p={2}
      borderRadius={10}
    >
      <Flex
        cursor="pointer"
        alignItems="center"
        gap={2}
        w="100%"
        onClick={() => {
          searchItemClicked();
          router.push(redirectTo);
        }}
      >
        <Box>
          <ChakraImage
            src={logo}
            alt={name}
            width={50}
            height={50}
            style={{ borderRadius: 10 }}
          />
        </Box>
        <Box>
          <Heading mb={1} as="p" size="sm">
            {name}
          </Heading>
          <Text>Football, {country}</Text>
        </Box>
      </Flex>
      {isAuthenticated && favoriteComponent}
    </Flex>
  );
};
