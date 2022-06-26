import { isEmail } from "@/shared/lib";
import { AlertMessage, EmailItem, PasswordItem } from "@/shared/ui";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React, { useState } from "react";
import { registerModel } from "..";

interface RegisterFormProps {
  changeAuthMode: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  changeAuthMode,
}) => {
  const email = useStore(registerModel.$email);
  const password = useStore(registerModel.$password);
  const [showPassword, setShowPassword] = useState(false);

  const isEmailError = !isEmail(email);
  const isPasswordError = password.trim().length < 6;
  const isInvalid = isEmailError || isPasswordError;

  const isLoading = useStore(registerModel.$registerLoading);
  const errorMessage = useStore(registerModel.$registerError);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerModel.formSubmitted();
  };

  return (
    <Flex onSubmit={onFormSubmit} as="form" flexDir="column" gap={4}>
      <EmailItem
        id="register-email"
        isError={isEmailError}
        setValue={(e) => registerModel.setEmail(e.target.value)}
        value={email}
      />
      <PasswordItem
        id="register-password"
        isError={isPasswordError}
        setShow={() => setShowPassword((prev) => !prev)}
        show={showPassword}
        value={password}
        setValue={(e) => registerModel.setPassword(e.target.value)}
      />
      <Button
        mb={2}
        disabled={isInvalid || isLoading}
        colorScheme="blue"
        variant="outline"
        type="submit">
        Register
      </Button>
      {errorMessage && <AlertMessage error={errorMessage} />}
      <Text textAlign="center">
        Have an account?
        <Button
          ml={2}
          onClick={changeAuthMode}
          variant="link"
          textDecoration="underline"
          _hover={{ textDecoration: "none" }}>
          Log in
        </Button>
      </Text>
    </Flex>
  );
};
