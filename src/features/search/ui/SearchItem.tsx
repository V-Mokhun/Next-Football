import { searchModalModel } from "@/entities/search";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEvent } from "effector-react";
import Image from "next/image";
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

  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      gap={3}
      p={2}
      borderRadius={10}>
      <Flex
        cursor="pointer"
        alignItems="center"
        gap={2}
        onClick={() => {
          searchItemClicked();
          router.push(redirectTo);
        }}>
        <Box>
          <Image
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
      {favoriteComponent}
    </Flex>
  );
};
