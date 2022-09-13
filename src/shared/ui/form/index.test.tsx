import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { EmailItem, PasswordItem } from "..";

describe("Form elements work", () => {
  test("Renders EmailItem", () => {
    const setValue = jest.fn();
    let value = "value";

    render(
      <EmailItem id="email" setValue={setValue} isError={false} value={value} />
    );

    const emailFormElem = screen.getByTestId("form-control");
    const emailInputElem = screen.getByTestId("email");

    expect(emailFormElem).toBeInTheDocument();
    expect(emailInputElem).toBeInTheDocument();
  });

  test("Renders EmailItem with error", () => {
    const setValue = jest.fn();
    let value = "value";

    render(
      <EmailItem id="email" setValue={setValue} isError={true} value={value} />
    );

    const emailFormElem = screen.getByTestId("form-control");
    const emailInputElem = screen.getByTestId("email");
    const emailErrorElem = screen.getByText("Email is required");

    expect(emailFormElem).toBeInTheDocument();
    expect(emailInputElem).toBeInTheDocument();
    expect(emailErrorElem).toBeInTheDocument();
  });

  test("Renders PasswordItem", () => {
    let show = false;
    let value = "value";
    const setValue = jest.fn();
    const setShow = jest.fn();

    const { container } = render(
      <PasswordItem
        id="password"
        setValue={setValue}
        isError={false}
        value={value}
        setShow={setShow}
        show={show}
      />
    );

    const passwordFormElem = screen.getByTestId("form-control");
    const passwordInputElem = screen.getByTestId("password");
    const passwordButtonElem = screen.getByTestId("password-button");

    expect(passwordFormElem).toBeInTheDocument();
    expect(passwordInputElem).toBeInTheDocument();
    expect(passwordButtonElem).toBeInTheDocument();
    expect(passwordInputElem).toHaveAttribute("type", "password");
    expect(container.querySelector("* > svg")).toHaveAttribute(
      "data-testid",
      "view-off-icon"
    );

    fireEvent.click(passwordButtonElem);

    expect(setShow).toHaveBeenCalledTimes(1);
  });

  test("Renders PasswordItem with error", () => {
    const setValue = jest.fn();
    const setShow = jest.fn(() => (show = !show));
    let value = "value";
    let show = true;
    const error = "ERROR!";

    const { container } = render(
      <PasswordItem
        id="password"
        setValue={setValue}
        isError={true}
        value={value}
        setShow={setShow}
        show={show}
        errorMessage={error}
      />
    );

    const passwordFormElem = screen.getByTestId("form-control");
    const passwordInputElem = screen.getByTestId("password");
    const passwordErrorElem = screen.getByText(error);
    expect(container.querySelector("* > svg")).toHaveAttribute(
      "data-testid",
      "view-on-icon"
    );

    expect(passwordFormElem).toBeInTheDocument();
    expect(passwordInputElem).toBeInTheDocument();
    expect(passwordErrorElem).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
