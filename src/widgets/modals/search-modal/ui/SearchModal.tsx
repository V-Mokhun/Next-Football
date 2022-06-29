import { searchModalModel } from "@/entities/search";
import { SearchForm, SearchList, searchModel } from "@/features/search";
import { useDebounce } from "@/shared/lib";
import { Modal } from "@/shared/ui";
import { useEvent, useStore } from "effector-react";
import React from "react";

interface SearchModalProps {}

export const SearchModal: React.FC<SearchModalProps> = ({}) => {
  const isOpen = useStore(searchModalModel.$modalOpen);
  const searchValue = useStore(searchModel.$search);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const closeModal = useEvent(searchModalModel.closeModal);

  return (
    <Modal title="Search" isOpen={isOpen} onClose={closeModal}>
      <SearchForm
        debouncedSearchValue={debouncedSearchValue}
        searchValue={searchValue}
      />
      <SearchList debouncedSearchValue={debouncedSearchValue} />
    </Modal>
  );
};
