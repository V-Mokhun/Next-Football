import {
  Divider,
  Heading,
  Modal as UiModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  return (
    <UiModal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h2" size="lg">
            {title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody p={{ base: 2, md: 4 }}>{children}</ModalBody>
      </ModalContent>
    </UiModal>
  );
};
