import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import { searchModel } from "..";

interface SearchItemProps {}

export const SearchItem: React.FC<SearchItemProps> = ({}) => {
  const search = useStore(searchModel.$search);
  const searchMode = useStore(searchModel.$searchMode);

  return (
    <>
      <Flex mb={3} justifyContent="space-between" alignItems="center" gap={3}>
        <Heading as="h3" size="md">
          Search leagues or teams
        </Heading>
        <Flex alignItems="center" gap={2}>
          <Button
            onClick={() => searchModel.changeSearchMode("leagues")}
            variant={searchMode === "leagues" ? "solid" : "outline"}>
            Leagues
          </Button>
          <Button
            onClick={() => searchModel.changeSearchMode("teams")}
            variant={searchMode === "teams" ? "solid" : "outline"}>
            Teams
          </Button>
        </Flex>
      </Flex>
      <FormControl>
        <Input
          type="text"
          size="md"
          placeholder="Search..."
          value={search}
          onChange={(e) => searchModel.changeSearch(e.target.value)}
        />
        <FormHelperText>
          Please, enter at least 3 symbols. Search results will appear
          immediately
        </FormHelperText>
      </FormControl>
    </>
  );
};
