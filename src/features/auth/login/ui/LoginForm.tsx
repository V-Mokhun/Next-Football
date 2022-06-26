import { isEmail } from "@/shared/lib";
import { AlertMessage, EmailItem, PasswordItem } from "@/shared/ui";
import { Button, Flex } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React, { useState } from "react";
import { loginModel } from "..";

interface LoginFormProps {
  changeAuthMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ changeAuthMode }) => {
  const email = useStore(loginModel.$email);
  const password = useStore(loginModel.$password);
  const [showPassword, setShowPassword] = useState(false);

  const isEmailError = !isEmail(email);
  const isPasswordError = password.trim().length < 6;
  const isInvalid = isEmailError || isPasswordError;

  const isLoading = useStore(loginModel.$loginLoading);
  const errorMessage = useStore(loginModel.$loginError);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginModel.formSubmitted();
  };

  return (
    <Flex onSubmit={onFormSubmit} as="form" flexDir="column" gap={4}>
      <EmailItem
        id="login-email"
        isError={isEmailError}
        setValue={(e) => loginModel.setEmail(e.target.value)}
        value={email}
      />
      <PasswordItem
        id="login-password"
        isError={isPasswordError}
        setShow={() => setShowPassword((prev) => !prev)}
        show={showPassword}
        value={password}
        setValue={(e) => loginModel.setPassword(e.target.value)}
      />
      <Button
        mb={2}
        disabled={isInvalid || isLoading}
        colorScheme="blue"
        variant="outline"
        type="submit">
        Log in
      </Button>
      {errorMessage && <AlertMessage error={errorMessage} />}
      <Button
        onClick={changeAuthMode}
        variant="link"
        textDecoration="underline"
        _hover={{ textDecoration: "none" }}>
        Register now
      </Button>
    </Flex>
  );
};
