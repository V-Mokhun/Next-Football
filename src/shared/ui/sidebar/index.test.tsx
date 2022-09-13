import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SidebarItem } from "./SidebarItem";

describe("SidebarItem works", () => {
  test("Renders SidebarItem", () => {
    const onClick = jest.fn();

    render(
      <SidebarItem
        id={1}
        name="name"
        logo="https://images.unsplash.com/photo-1662581872277-0fd0bf3ae8f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"
        onClick={onClick}
        favoriteComponent={<div>Favorite</div>}
      />
    );

    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("Favorite")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-item-image")).toBeInTheDocument();
  });

  test("Renders SidebarItem with no image", () => {
    const onClick = jest.fn();

    render(
      <SidebarItem
        id={1}
        name="name"
        logo="https://images.unsplash.com/photo-1662581872277-0fd0bf3ae8f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"
        onClick={onClick}
        favoriteComponent={<div>Favorite</div>}
        noImage={true}
      />
    );

    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("Favorite")).toBeInTheDocument();
    expect(screen.queryByTestId("sidebar-item-image")).not.toBeInTheDocument();
  });
});
