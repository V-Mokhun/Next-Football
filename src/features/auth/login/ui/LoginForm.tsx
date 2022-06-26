import { isEmail } from "@/shared/lib";
import { EmailItem, PasswordItem } from "@/shared/ui";
import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

interface LoginFormProps {
  changeAuthMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ changeAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailError = !isEmail(email);
  const isPasswordError = password.trim().length < 6;
  const isInvalid = isEmailError || isPasswordError;

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Flex onSubmit={onFormSubmit} as="form" flexDir="column" gap={4}>
      <EmailItem
        id="login-email"
        isError={isEmailError}
        setValue={(e) => setEmail(e.target.value)}
        value={email}
      />
      <PasswordItem
        id="login-password"
        isError={isPasswordError}
        setShow={() => setShowPassword((prev) => !prev)}
        show={showPassword}
        value={password}
        setValue={(e) => setPassword(e.target.value)}
      />
      <Button
        mb={2}
        disabled={isInvalid}
        colorScheme="blue"
        variant="outline"
        type="submit">
        Log in
      </Button>
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
