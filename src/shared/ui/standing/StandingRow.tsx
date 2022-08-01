import { Standing } from "@/shared/api";
import { TEAM_ROUTE } from "@/shared/lib";
import {
  Box,
  Flex,
  Img,
  Link,
  Td,
  Text,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface StandingRowProps {
  standing: Standing;
}

export const StandingRow: React.FC<StandingRowProps> = ({ standing }) => {
  const { colorMode } = useColorMode();
  const standingForm = standing.form && standing.form.split("");

  return (
    <Tr>
      <Td
        backgroundColor={colorMode === "dark" ? "#010a0f" : "fff"}
        textAlign="center"
        px={2}
        py={3}
      >
        {standing.rank}.
      </Td>
      <Td
        backgroundColor={colorMode === "dark" ? "#010a0f" : "fff"}
        px={2}
        py={3}
      >
        <NextLink href={`${TEAM_ROUTE}/${standing.team.id}`} passHref>
          <Link>
            <Flex alignItems="center" gap={2}>
              <Img
                alt={standing.team.name}
                src={standing.team.logo}
                w="20px"
                h="20px"
              />
              <Text>{standing.team.name}</Text>
            </Flex>
          </Link>
        </NextLink>
      </Td>
      <Td
        backgroundColor={colorMode === "dark" ? "#010a0f" : "fff"}
        px={2}
        py={3}
      >
        {standing.all.played ?? 0}
      </Td>
      <Td
        backgroundColor={colorMode === "dark" ? "#010a0f" : "fff"}
        px={2}
        py={3}
      >
        {standing.all.win ?? 0}
      </Td>
      <Td
        backgroundColor={colorMode === "dark" ? "#010a0f" : "fff"}
        px={2}
        py={3}
      >
        {standing.all.draw ?? 0}
      </Td>
      <Td
        backgroundColor={colorMode === "dark" ? "#010a0f" : "fff"}
        px={2}
        py={3}
      >
        {standing.all.lose ?? 0}
      </Td>
      <Td
        textAlign="center"
        backgroundColor={colorMode === "dark" ? "#010a0f" : "fff"}
        px={2}
        py={3}
      >
        {standing.all.goals.for ?? 0}:{standing.all.goals.against ?? 0}
      </Td>
      <Td
        textAlign="center"
        backgroundColor={colorMode === "dark" ? "#010a0f" : "fff"}
        px={2}
        py={3}
        fontWeight={700}
      >
        {standing.points ?? 0}
      </Td>
      <Td
        backgroundColor={colorMode === "dark" ? "#010a0f" : "fff"}
        px={2}
        py={3}
      >
        <Flex alignItems="center" gap={1}>
          {Array.isArray(standingForm) &&
            standingForm.map((form, index) => {
              if (index > 5) return null;
              let bgColor = "#dc0000";
              if (form === "W") {
                bgColor = "#00a83f";
              } else if (form === "D") {
                bgColor = "#f3a000";
              }

              return (
                <Box
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
