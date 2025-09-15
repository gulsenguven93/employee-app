import React from "react";
import { useState } from "react";
import "../styles/EmployeeList.css";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import ModalDelete from "./ModalDelete";

const EmployeeList = ({ employeeList, setEmployeeList }) => {
  const handleDelete = (id) => {
    const filtered = employeeList.filter((emp) => emp.id !== id);
    setEmployeeList(filtered);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <section className="container">
      <h1>Employee List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Position</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                {employee.firstName} {employee.lastName}
              </td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.dateOfEmployment}</td>
              <td>{employee.dateOfBirth}</td>
              <td>
                <button className="icon-btn edit-btn" title="Edit Employee">
                  <EditIcon size={16} color="#FF6101" />
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedEmployee(employee);
                  }}
                  title="Delete Employee"
                >
                  <DeleteIcon size={16} color="#FF6101" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalDelete
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={selectedEmployee}
        onDelete={() => {
          handleDelete(selectedEmployee.id);
          setIsModalOpen(false);
        }}
      />
    </section>
  );
};

export default EmployeeList;
