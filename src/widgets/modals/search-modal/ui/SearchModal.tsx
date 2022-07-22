import { searchModalModel } from "@/entities/search";
import { SearchForm, SearchList, searchModel } from "@/features/search";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { useDebounce } from "@/shared/lib";
import { Modal } from "@/shared/ui";
import { useEvent, useStore } from "effector-react";
import React from "react";

interface SearchModalProps {}

export const SearchModal: React.FC<SearchModalProps> = ({}) => {
  const isModalOpen = useStore(searchModalModel.$modalOpen)
  const searchValue = useStore(searchModel.$search);

  const closeModal = useEvent(searchModalModel.closeModal);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  return (
    <Modal title="Search" isOpen={isModalOpen} onClose={closeModal}>
      <SearchForm
        debouncedSearchValue={debouncedSearchValue}
        searchValue={searchValue}
      />
      <SearchList
        FavoriteLeagueComponent={FavoriteLeagueButton}
        FavoriteTeamComponent={FavoriteTeamButton}
        debouncedSearchValue={debouncedSearchValue}
      />
    </Modal>
  );
};
