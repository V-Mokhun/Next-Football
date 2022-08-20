import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface CardBlockProps extends BoxProps {
  children?: React.ReactNode;
}

export const CardBlock: React.FC<CardBlockProps> = ({ children, ...props }) => {
  return (
    <Box
      borderRadius="8px"
      p="12px"
      backgroundColor="main.500"
      mx={{ base: "-15px", md: "0" }}
      {...props}
    >
      {children}
    </Box>
  );
};
