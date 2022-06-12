import { extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";

const overrides = {
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor: props.colorMode === "dark" ? "#010a0f" : "#eee",
      },
    }),
  },
  config: {
    initialColorMode: "dark",
  },
};

export const theme = extendTheme(overrides);
