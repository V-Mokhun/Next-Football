import { theme } from "@/entities/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface AppProviderProps {
  children: React.ReactNode;
	session: Session | null | undefined
}

const AppProvider: React.FC<AppProviderProps> = ({ children, session }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SessionProvider refetchInterval={5 * 60} session={session}>{children}</SessionProvider>
    </ChakraProvider>
  );
};

export default AppProvider;
