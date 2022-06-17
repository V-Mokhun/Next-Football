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
}

export const PasswordItem: React.FC<PasswordItemProps> = ({
  isError,
  setValue,
  value,
  show,
  setShow,
}) => {
  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor="password">Password</FormLabel>
      <InputGroup>
        <Input
          id="password"
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
      {isError && <FormErrorMessage>Password is required</FormErrorMessage>}
    </FormControl>
  );
};
