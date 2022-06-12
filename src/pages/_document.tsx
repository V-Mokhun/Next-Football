import Document, { Html, Head, Main, NextScript } from "next/document";
import { withFork } from "effector-next";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "@/shared/lib";

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
