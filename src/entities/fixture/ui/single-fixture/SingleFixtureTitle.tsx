import { Flex, FlexProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface SingleFixtureTitleProps extends FlexProps {
  children?: ReactNode | ReactNode[];
}

export const SingleFixtureTitle: React.FC<SingleFixtureTitleProps> = ({
  children,
  ...restProps
}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      backgroundColor="main.400"
      py={1}
      px={3}
      borderRadius="8px"
      fontSize="md"
      mb={2}
      {...restProps}
    >
      {children}
    </Flex>
  );
};
