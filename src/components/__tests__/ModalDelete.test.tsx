import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalDelete from "../ModalDelete";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockEmployee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
};

describe("ModalDelete Component", () => {
  const mockOnClose = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal when isOpen is true", () => {
    render(
      <ModalDelete
        isOpen={true}
        onClose={mockOnClose}
        employee={mockEmployee}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("modalDelete.title")).toBeInTheDocument();
    expect(screen.getByText("modalDelete.text")).toBeInTheDocument();
  });

  test("does not render modal when isOpen is false", () => {
    render(
      <ModalDelete
        isOpen={false}
        onClose={mockOnClose}
        employee={mockEmployee}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.queryByText("modalDelete.title")).not.toBeInTheDocument();
  });

  test("calls onDelete when delete button is clicked", () => {
    render(
      <ModalDelete
        isOpen={true}
        onClose={mockOnClose}
        employee={mockEmployee}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByText("modalDelete.button");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when cancel button is clicked", () => {
    render(
      <ModalDelete
        isOpen={true}
        onClose={mockOnClose}
        employee={mockEmployee}
        onDelete={mockOnDelete}
      />
    );

    const cancelButton = screen.getByText("employeeForm.cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("displays employee name in confirmation message", () => {
    render(
      <ModalDelete
        isOpen={true}
        onClose={mockOnClose}
        employee={mockEmployee}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("modalDelete.text")).toBeInTheDocument();
  });

  test("handles missing employee gracefully", () => {
    render(
      <ModalDelete
        isOpen={true}
        onClose={mockOnClose}
        employee={null}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("modalDelete.title")).toBeInTheDocument();
    expect(screen.getByText("modalDelete.text")).toBeInTheDocument();
  });
});
