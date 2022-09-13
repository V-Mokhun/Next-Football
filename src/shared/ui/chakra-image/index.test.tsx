import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ChakraImage } from ".";

describe("ChakraImage works", () => {
  test("Renders ChakraImage", () => {
    render(
      <ChakraImage
        width={50}
        height={50}
        alt="alt"
        src="https://images.unsplash.com/photo-1661376019257-4e5d8a45fc6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
      />
    );
    const chakraImageElem = screen.getByAltText("alt");

    expect(chakraImageElem).toBeInTheDocument();
  });
});
