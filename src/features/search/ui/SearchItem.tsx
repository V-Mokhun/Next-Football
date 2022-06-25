import { searchModalModel } from "@/entities/search";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface SearchItemProps {
  redirectTo: string;
  logo: string;
  name: string;
  country: string;
}

export const SearchItem: React.FC<SearchItemProps> = ({
  logo,
  name,
  country,
  redirectTo,
}) => {
  const router = useRouter();

  return (
    <Flex
      onClick={() => {
        searchModalModel.searchItemClicked();
        router.push(redirectTo);
      }}
      width="100%"
      cursor="pointer"
      alignItems="center"
      gap={3}
      p={2}
      borderRadius={10}>
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
  );
};
