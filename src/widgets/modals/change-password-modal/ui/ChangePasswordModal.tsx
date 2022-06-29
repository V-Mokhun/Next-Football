import { ChangePasswordForm } from "@/features/auth/change-password";
import { Modal } from "@/shared/ui";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { changePasswordModalModel } from "..";

interface ChangePasswordModalProps {}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({}) => {
  const isOpen = useStore(changePasswordModalModel.$modalOpen);
  const closeModal = useEvent(changePasswordModalModel.closeModal);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Change password">
      <ChangePasswordForm />
    </Modal>
  );
};
