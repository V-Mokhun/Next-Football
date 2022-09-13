import { Menu } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MenuButton } from "..";

describe("MenuButton works", () => {
  test("Renders MenuButton with not active prop", () => {
    const { container } = render(
      <Menu>
        <MenuButton isActive={false} />
      </Menu>
    );
    const menuButtonElem = screen.getByTestId("menu-button");

    expect(menuButtonElem).toBeInTheDocument();
    expect(container.querySelector("button > svg")).toHaveAttribute(
      "data-testid",
      "hamburger-icon"
    );
  });

  test("Renders MenuButton with active prop", () => {
    const { container } = render(
      <Menu>
        <MenuButton isActive={true} />
      </Menu>
    );
    const menuButtonElem = screen.getByTestId("menu-button");

    expect(menuButtonElem).toBeInTheDocument();
    expect(container.querySelector("button > svg")).toHaveAttribute(
      "data-testid",
      "close-icon"
    );
  });
});
