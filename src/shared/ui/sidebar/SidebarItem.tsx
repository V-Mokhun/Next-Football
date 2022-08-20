import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import React from "react";
import { ChakraImage } from "../chakra-image";

interface SidebarItemProps extends FlexProps {
  onClick: () => void;
  id: number;
  logo: string;
  name: string;
  favoriteComponent: React.ReactElement | null;
  noImage?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  favoriteComponent,
  id,
  logo,
  name,
  onClick,
  noImage = false,
  ...props
}) => {
  return (
    <Flex
      key={id}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      py={1}
      pl={{ base: 0, md: 1 }}
      borderRadius={10}
      position="relative"
      pr={8}
      {...props}
    >
      <>
        <Flex
          cursor="pointer"
          alignItems="center"
          gap={1}
          onClick={onClick}
          w="100%"
          _hover={{
            textDecoration: "underline",
          }}
        >
          {noImage ? null : (
            <Flex justifyContent="center" alignItems="center" flex="0 0 18px">
              <ChakraImage src={logo} alt={name} width={18} height={18} />
            </Flex>
          )}
          <Heading
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            as="p"
            size="xs"
          >
            {name}
          </Heading>
        </Flex>
        {favoriteComponent}
      </>
    </Flex>
  );
};
