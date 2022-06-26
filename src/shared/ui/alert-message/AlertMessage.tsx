import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

interface AlertMessageProps {
  error: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ error }) => {
  return (
    <Alert mt={2} status="error">
      <AlertIcon />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};
