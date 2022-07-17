import { theme } from "@/shared/lib";
import { ColorModeScript } from "@chakra-ui/react";
import { withFork } from "effector-next";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

const enhance = withFork({ debug: false });
export default enhance(MyDocument);
