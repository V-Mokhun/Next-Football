import { searchModalModel } from "@/entities/search";
import { SearchForm, SearchList, searchModel } from "@/features/search";
import { useDebounce } from "@/shared/lib";
import {
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";

interface SearchModalProps {}

export const SearchModal: React.FC<SearchModalProps> = ({}) => {
  const isOpen = useStore(searchModalModel.$modalOpen);
  const searchValue = useStore(searchModel.$search);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  return (
    <Modal size="xl" isOpen={isOpen} onClose={searchModalModel.closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h2" size="lg">
            Search
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody py={4}>
          <SearchForm
            debouncedSearchValue={debouncedSearchValue}
            searchValue={searchValue}
          />
          <SearchList debouncedSearchValue={debouncedSearchValue} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
