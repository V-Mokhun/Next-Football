import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CardBlock } from ".";

describe("CardBlock works", () => {
  test("Renders CardBlock", () => {
    render(<CardBlock />);
    const cardBlockElem = screen.getByTestId("card-block");

    expect(cardBlockElem).toBeInTheDocument();
  });

  test("Renders CardBlock with children", () => {
    render(
      <CardBlock>
        <p>Text</p>
      </CardBlock>
    );
    const cardBlockElem = screen.getByTestId("card-block");
    const cardBlockTextElem = screen.getByText("Text");

    expect(cardBlockElem).toBeInTheDocument();
    expect(cardBlockTextElem).toBeInTheDocument();
  });
});
