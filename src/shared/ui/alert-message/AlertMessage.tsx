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
    <Alert data-testid="alert" mt={2} status="error" {...props}>
      <AlertIcon />
      <AlertTitle data-testid="alert-title">Error!</AlertTitle>
      <AlertDescription data-testid="alert-description">
        {error}
      </AlertDescription>
    </Alert>
  );
};
