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
  id: string;
}

export const EmailItem: React.FC<EmailItemProps> = ({
  isError,
  setValue,
  value,
  id,
}) => {
  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor={id}>Email</FormLabel>
      <Input id={id} type="email" value={value} onChange={setValue} />
      {isError && <FormErrorMessage>Email is required</FormErrorMessage>}
    </FormControl>
  );
};
