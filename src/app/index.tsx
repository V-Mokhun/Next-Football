import { theme } from "@/shared/lib";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export default AppProvider;
