import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

interface EmailItemProps {
  isError: boolean;
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailItem: React.FC<EmailItemProps> = ({
  isError,
  setValue,
  value,
}) => {
  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input id="email" type="email" value={value} onChange={setValue} />
      {isError && <FormErrorMessage>Email is required</FormErrorMessage>}
    </FormControl>
  );
};
