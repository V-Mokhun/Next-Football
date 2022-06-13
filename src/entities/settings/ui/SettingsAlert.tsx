import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";

interface SettingsAlertProps {
  error: string;
}

export const SettingsAlert: React.FC<SettingsAlertProps> = ({ error }) => {
  return (
    <Alert mt={2} status="error">
      <AlertIcon />
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};
