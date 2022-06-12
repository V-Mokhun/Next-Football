import {
  FormControl,
  FormHelperText,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input
              type={"text"}
              size="md"
              placeholder="Search..."
              value={searchValue}
              onChange={onSearchChange}
            />
            <FormHelperText>
              Please, enter at least 3 symbols. Search results will appear
              immediately
            </FormHelperText>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
