import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const overrides = {
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor: props.colorMode === "dark" ? "#010a0f" : "#eee",
      },
      ":root": {
        "--chakra-colors-main-400": mode("#fff2ce", "#001e28")(props),
        "--chakra-colors-main-500": mode("#fff", "#00141e")(props),
      },
    }),
  },
  colors: {
    main: {
      400: "#001e28",
      500: "#00141e",
    },
    primary: {
      400: "#ff0046",
      500: "#c80037",
    },
  },
  config: {
    initialColorMode: "dark",
  },
};

export const theme = extendTheme(overrides);
