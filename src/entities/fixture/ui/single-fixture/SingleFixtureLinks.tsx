import {
  FIXTURE_ROUTE,
  HEAD_TO_HEAD_ROUTE,
  SQUAD_ROUTE,
  STATISTICS_ROUTE,
} from "@/shared/lib";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface SingleFixtureLinksProps {
  id: number;
  isSquadEmpty?: boolean;
  isStatisticsEmpty?: boolean;
}

const LINKS = (id: number) => [
  {
    isActivePath: `${id}`,
    onClickPath: `${FIXTURE_ROUTE}/${id}`,
    text: "Match review",
  },
  {
    isActivePath: `${STATISTICS_ROUTE}`,
    onClickPath: `${FIXTURE_ROUTE}/${id}/${STATISTICS_ROUTE}`,
    text: "Statistics",
  },
  {
    isActivePath: `${SQUAD_ROUTE}`,
    onClickPath: `${FIXTURE_ROUTE}/${id}/${SQUAD_ROUTE}`,
    text: "Squad",
  },
  {
    isActivePath: `${HEAD_TO_HEAD_ROUTE}`,
    onClickPath: `${FIXTURE_ROUTE}/${id}/${HEAD_TO_HEAD_ROUTE}`,
    text: "H2H",
  },
];

export const SingleFixtureLinks: React.FC<SingleFixtureLinksProps> = ({
  id,
  isSquadEmpty = false,
  isStatisticsEmpty = false,
}) => {
  const router = useRouter();

  return (
    <Flex
      alignItems="center"
      py={3}
      px={2}
      gap={4}
      borderBottomColor="main.400"
      borderBottomWidth={1}
      borderBottomStyle="solid"
    >
      {LINKS(id).map(({ isActivePath, onClickPath, text }) => {
        if (isSquadEmpty && isActivePath === SQUAD_ROUTE) return null;
        if (isStatisticsEmpty && isActivePath === STATISTICS_ROUTE) return null;

        return (
          <Button
            key={text}
            isActive={router.asPath.endsWith(isActivePath)}
            onClick={() => router.push(onClickPath)}
            variant="link"
            _active={{
              color: "primary.400",
            }}
          >
            {text}
          </Button>
        );
      })}
    </Flex>
  );
};
