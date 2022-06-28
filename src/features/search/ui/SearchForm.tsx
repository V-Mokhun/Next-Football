import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import { searchModel } from "..";

interface SearchFormProps {
  debouncedSearchValue: string;
  searchValue: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  debouncedSearchValue,
  searchValue,
}) => {
  const searchMode = useStore(searchModel.$searchMode);
  const loading = useStore(searchModel.$searchLoading);
  const resetItems = useEvent(searchModel.resetItems);
  const changeSearch = useEvent(searchModel.changeSearch);
  const leaguesButtonClicked = useEvent(searchModel.leaguesButtonClicked);
  const teamsButtonClicked = useEvent(searchModel.teamsButtonClicked);

  useEffect(() => {
    if (!debouncedSearchValue || debouncedSearchValue.trim().length < 3) {
      resetItems();
      return;
    }

    if (searchMode === "leagues") {
      searchModel.fetchLeaguesFx(debouncedSearchValue);
    } else {
      searchModel.fetchTeamsFx(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

  return (
    <>
      <Flex mb={3} justifyContent="space-between" alignItems="center" gap={3}>
        <Heading as="h3" size="md">
          Search leagues or teams
        </Heading>
        <Flex alignItems="center" gap={2}>
          <Button
            isDisabled={loading}
            onClick={() => leaguesButtonClicked()}
            variant={searchMode === "leagues" ? "solid" : "outline"}>
            Leagues
          </Button>
          <Button
            isDisabled={loading}
            onClick={() => teamsButtonClicked()}
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
          value={searchValue}
          onChange={(e) => changeSearch(e.target.value)}
        />
        {debouncedSearchValue.trim().length < 3 && (
          <FormHelperText>
            Please, enter at least 3 symbols. Search results will appear
            immediately
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};
