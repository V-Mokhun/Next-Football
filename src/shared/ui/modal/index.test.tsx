import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Modal } from "..";

describe("Modal works", () => {
  test("Renders Modal with children and title", () => {
    const onClose = jest.fn();

    render(
      <Modal title="title" isOpen={true} onClose={onClose}>
        <div>body</div>
      </Modal>
    );

    expect(screen.getByText("body")).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();
  });
});
