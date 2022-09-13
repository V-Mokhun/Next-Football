import { Standing } from "@/shared/api";
import { TEAM_ROUTE } from "@/shared/lib";
import { Box, Flex, Link, Td, Text, Tr, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { ChakraImage } from "../chakra-image";

interface StandingRowProps {
  standing: Standing;
  isTeamSelected?: boolean;
}

export const StandingRow: React.FC<StandingRowProps> = ({
  standing,
  isTeamSelected = false,
}) => {
  const { colorMode } = useColorMode();
  const standingForm = standing.form && standing.form.split("");

  let bgColor = colorMode === "dark" ? "#010a0f" : "#fff";

  if (isTeamSelected) {
    bgColor = "main.400";
  }

  return (
    <Tr>
      <Td backgroundColor={bgColor} textAlign="center" px={2} py={3}>
        {standing.rank}.
      </Td>
      <Td backgroundColor={bgColor} px={2} py={3}>
        <NextLink href={`${TEAM_ROUTE}/${standing.team.id}`} passHref>
          <Link>
            <Flex alignItems="center" gap={2}>
              {standing.team.logo && (
                <Box data-testid="standing-row-image" flex="0 0 20px">
                  <ChakraImage
                    alt={standing.team.name}
                    src={standing.team.logo}
                    width={20}
                    height={20}
                  />
                </Box>
              )}
              <Text
                maxWidth={{ base: "100px", sm: "150px", md: "none" }}
                overflow={{ base: "hidden", md: "initial" }}
                textOverflow={{ base: "ellipsis", md: "initial" }}
              >
                {standing.team.name}
              </Text>
            </Flex>
          </Link>
        </NextLink>
      </Td>
      <Td backgroundColor={bgColor} px={2} py={3}>
        {standing.all.played ?? 0}
      </Td>
      <Td backgroundColor={bgColor} px={2} py={3}>
        {standing.all.win ?? 0}
      </Td>
      <Td backgroundColor={bgColor} px={2} py={3}>
        {standing.all.draw ?? 0}
      </Td>
      <Td backgroundColor={bgColor} px={2} py={3}>
        {standing.all.lose ?? 0}
      </Td>
      <Td textAlign="center" backgroundColor={bgColor} px={2} py={3}>
        {standing.all.goals.for ?? 0}:{standing.all.goals.against ?? 0}
      </Td>
      <Td
        textAlign="center"
        backgroundColor={bgColor}
        px={2}
        py={3}
        fontWeight={700}
      >
        {standing.points ?? 0}
      </Td>
      <Td backgroundColor={bgColor} px={2} py={3}>
        <Flex alignItems="center" gap={1}>
          {Array.isArray(standingForm) &&
            standingForm.map((form, index) => {
              if (index >= 5) return null;
              let bgColor = "#dc0000";
              if (form === "W") {
                bgColor = "#00a83f";
              } else if (form === "D") {
                bgColor = "#f3a000";
              }

              return (
                <Box
                  data-testid="standing-row-form"
                  borderRadius="4px"
                  w="20px"
                  h="20px"
                  key={form + index}
                  bgColor={bgColor}
                >
                  <Text textAlign="center" fontSize="sm">
                    {form}
                  </Text>
                </Box>
              );
            })}
        </Flex>
      </Td>
    </Tr>
  );
};
