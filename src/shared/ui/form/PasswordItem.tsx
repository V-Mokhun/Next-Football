import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

interface PasswordItemProps {
  isError: boolean;
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  setShow: () => void;
  id: string;
  label?: string;
  errorMessage?: string;
}

export const PasswordItem: React.FC<PasswordItemProps> = ({
  isError,
  setValue,
  value,
  show,
  setShow,
  id,
  label,
  errorMessage,
}) => {
  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor={id}>{label || "Password"}</FormLabel>
      <InputGroup>
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={setValue}
        />
        <InputRightElement>
          <IconButton
            size="sm"
            onClick={setShow}
            aria-label="Show password"
            icon={show ? <ViewIcon /> : <ViewOffIcon />}
          />
        </InputRightElement>
      </InputGroup>
      {isError && (
        <FormErrorMessage>
          {errorMessage || "Password is required"}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
