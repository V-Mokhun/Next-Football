import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

interface AlertMessageProps extends AlertProps {
  error: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  error,
  ...props
}) => {
  return (
    <Alert mt={2} status="error" {...props}>
      <AlertIcon />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};
