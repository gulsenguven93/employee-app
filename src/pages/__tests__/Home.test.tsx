import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../Home";

jest.mock("../../components/EmployeeList", () => {
  return function MockEmployeeList({ employeeList, onDelete }) {
    return (
      <div data-testid="employee-list">
        EmployeeList with {employeeList.length} employees
        <button onClick={() => onDelete({ id: 1 })}>Delete Employee</button>
      </div>
    );
  };
});

jest.mock("../../components/EmployeeCard", () => {
  return function MockEmployeeCard({ employee, onDelete }) {
    return (
      <div data-testid="employee-card">
        {employee.firstName} {employee.lastName}
        <button onClick={() => onDelete(employee)}>Delete Employee</button>
      </div>
    );
  };
});

jest.mock("../../components/ModalDelete", () => {
  return function MockModalDelete({ isOpen, onClose, employee, onDelete }) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal-delete">
        <p>
          Delete {employee?.firstName} {employee?.lastName}?
        </p>
        <button onClick={onDelete}>Confirm Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  };
});

jest.mock("../../icons", () => ({
  ListIcon: () => <span data-testid="list-icon">List</span>,
  CardIcon: () => <span data-testid="card-icon">Card</span>,
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockEmployees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    department: "Engineering",
    position: "Developer",
    dateOfEmployment: "2023-01-15",
    dateOfBirth: "1990-05-20",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    department: "Marketing",
    position: "Manager",
    dateOfEmployment: "2022-03-10",
    dateOfBirth: "1988-12-05",
  },
];

describe("Home Component", () => {
  const mockSetEmployeeList = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders home page with title", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    expect(screen.getByText("home.title")).toBeInTheDocument();
  });

  test("displays view toggle buttons", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    expect(screen.getByTestId("list-icon")).toBeInTheDocument();
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });

  test("shows list view by default", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    expect(screen.getByTestId("employee-list")).toBeInTheDocument();
    expect(screen.queryByTestId("employee-card")).not.toBeInTheDocument();
  });

  test("switches to card view when card button is clicked", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    const cardButton = screen.getByTitle("Card View");
    fireEvent.click(cardButton);

    expect(screen.queryByTestId("employee-list")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("employee-card")).toHaveLength(2);
  });

  test("switches back to list view when list button is clicked", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    const cardButton = screen.getByTitle("Card View");
    fireEvent.click(cardButton);

    const listButton = screen.getByTitle("List View");
    fireEvent.click(listButton);

    expect(screen.getByTestId("employee-list")).toBeInTheDocument();
    expect(screen.queryByTestId("employee-card")).not.toBeInTheDocument();
  });

  test("opens modal when delete is triggered", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    const cardButton = screen.getByTitle("Card View");
    fireEvent.click(cardButton);

    const deleteButtons = screen.getAllByText("Delete Employee");
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByTestId("modal-delete")).toBeInTheDocument();
  });

  test("closes modal when cancel is clicked", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    const cardButton = screen.getByTitle("Card View");
    fireEvent.click(cardButton);

    const deleteButtons = screen.getAllByText("Delete Employee");
    fireEvent.click(deleteButtons[0]);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.queryByTestId("modal-delete")).not.toBeInTheDocument();
  });

  test("handles employee deletion", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    const cardButton = screen.getByTitle("Card View");
    fireEvent.click(cardButton);

    const deleteButtons = screen.getAllByText("Delete Employee");
    fireEvent.click(deleteButtons[0]);

    const confirmButton = screen.getByText("Confirm Delete");
    fireEvent.click(confirmButton);

    expect(mockSetEmployeeList).toHaveBeenCalled();
  });

  test("displays correct number of employee cards in card view", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    const cardButton = screen.getByTitle("Card View");
    fireEvent.click(cardButton);

    const employeeCards = screen.getAllByTestId("employee-card");
    expect(employeeCards).toHaveLength(2);
  });

  test("has proper CSS classes for view toggle buttons", () => {
    render(
      <Home
        employeeList={mockEmployees}
        setEmployeeList={mockSetEmployeeList}
      />
    );

    const listButton = screen.getByTitle("List View");
    const cardButton = screen.getByTitle("Card View");

    expect(listButton).toHaveClass("view-toggle-btn", "active");
    expect(cardButton).toHaveClass("view-toggle-btn");
  });
});
