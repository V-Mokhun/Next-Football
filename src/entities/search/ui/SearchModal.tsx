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
import React from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h2" size="lg">
            Search
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody py={4}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
