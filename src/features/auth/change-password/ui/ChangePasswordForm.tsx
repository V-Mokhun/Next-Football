import { AlertMessage, PasswordItem } from "@/shared/ui";
import { Button, Flex } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React, { useState } from "react";
import { changePasswordModel } from "..";

interface ChangePasswordFormProps {}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({}) => {
  const oldPassword = useStore(changePasswordModel.$oldPassword);
  const newPassword = useStore(changePasswordModel.$newPassword);

  const setOldPassword = useEvent(changePasswordModel.setOldPassword);
  const setNewPassword = useEvent(changePasswordModel.setNewPassword);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isPasswordsSame, setIsPasswordsSame] = useState(false);

  const isOldPasswordError = oldPassword.trim().length < 6;
  const isNewPasswordError = newPassword.trim().length < 6;
  const isInvalid = isOldPasswordError || isNewPasswordError;

  const isLoading = useStore(changePasswordModel.$loading);
  const errorMessage = useStore(changePasswordModel.$error);

  // console.log("ERROR MESSAGE: ", errorMessage);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordsSame(false);

    if (oldPassword === newPassword) {
      setIsPasswordsSame(true);
      return;
    }

    changePasswordModel.formSubmitted();
  };

  return (
    <Flex onSubmit={onFormSubmit} as="form" flexDir="column" gap={4}>
      <PasswordItem
        id="change-password-pass"
        isError={isOldPasswordError}
        setShow={() => setShowOldPassword((prev) => !prev)}
        show={showOldPassword}
        value={oldPassword}
        setValue={(e) => setOldPassword(e.target.value)}
        label="Old password"
        errorMessage="Old password is required"
      />
      <PasswordItem
        id="change-password-new-pass"
        isError={isNewPasswordError}
        setShow={() => setShowNewPassword((prev) => !prev)}
        show={showNewPassword}
        value={newPassword}
        setValue={(e) => setNewPassword(e.target.value)}
        label="New password"
        errorMessage="New password is required"
      />
      <Button
        mb={2}
        disabled={isInvalid || isLoading}
        colorScheme="blue"
        variant="outline"
        type="submit">
        Change password
      </Button>
      {isPasswordsSame && <AlertMessage error="Passwords are the same" />}
      {errorMessage && <AlertMessage error={errorMessage} />}
    </Flex>
  );
};
