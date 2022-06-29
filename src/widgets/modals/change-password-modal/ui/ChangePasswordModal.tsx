import { ChangePasswordForm } from "@/features/auth/change-password";
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
import { useEvent, useStore } from "effector-react";
import React from "react";
import { changePasswordModalModel } from "..";

interface ChangePasswordModalProps {}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({}) => {
  const isOpen = useStore(changePasswordModalModel.$modalOpen);
  const closeModal = useEvent(changePasswordModalModel.closeModal);

  return (
    <Modal size="xl" isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h2" size="lg">
            Settings
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody py={4}>
          <ChangePasswordForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
