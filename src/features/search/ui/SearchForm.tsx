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
import { useStore } from "effector-react";
import { searchModel } from "..";
import { useDebounce } from "@/shared/lib";

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

  useEffect(() => {
    if (!debouncedSearchValue || debouncedSearchValue.trim().length < 3) {
      searchModel.resetItems();
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
            onClick={() => searchModel.changeSearchMode("leagues")}
            variant={searchMode === "leagues" ? "solid" : "outline"}>
            Leagues
          </Button>
          <Button
            isDisabled={loading}
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
          value={searchValue}
          onChange={(e) => searchModel.changeSearch(e.target.value)}
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
