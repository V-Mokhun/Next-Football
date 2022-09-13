import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AlertMessage } from "./AlertMessage";

describe("AlertMessage works", () => {
  test("Renders AlertMessage", () => {
    const errorMessage = "Error message!";
    render(<AlertMessage error={errorMessage} />);
    const alertElem = screen.getByTestId("alert");
    const alertTitleElem = screen.getByTestId("alert-title");
    const alertDescrElem = screen.getByTestId("alert-description");

    expect(alertElem).toBeInTheDocument();
    expect(alertTitleElem).toBeInTheDocument();
    expect(alertTitleElem).toHaveTextContent("Error!");
    expect(alertDescrElem).toBeInTheDocument();
    expect(alertDescrElem).toHaveTextContent(errorMessage);
  });
});
