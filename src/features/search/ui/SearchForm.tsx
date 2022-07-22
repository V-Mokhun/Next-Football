import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input
} from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React, { useEffect } from "react";
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
  const onFetchLeagues = useEvent(searchModel.onFetchLeagues);
  const onFetchTeams = useEvent(searchModel.onFetchTeams);

  useEffect(() => {
    if (!debouncedSearchValue || debouncedSearchValue.trim().length < 3) {
      resetItems();
      return;
    }

    if (searchMode === "leagues") {
      onFetchLeagues(debouncedSearchValue);
    } else {
      onFetchTeams(debouncedSearchValue);
    }
  }, [
    debouncedSearchValue,
    resetItems,
    searchMode,
    onFetchLeagues,
    onFetchTeams,
  ]);

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
