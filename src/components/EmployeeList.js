import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeList.css";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

const EmployeeList = ({ employeeList, onDelete }) => {
  const navigate = useNavigate();

  return (
    <section>
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
                <button
                  className="icon-btn edit-btn"
                  onClick={() => navigate(`/edit-employee/${employee.id}`)}
                  title="Edit Employee"
                >
                  <EditIcon size={16} color="#FF6101" />
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() => onDelete(employee)}
                  title="Delete Employee"
                >
                  <DeleteIcon size={16} color="#FF6101" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default EmployeeList;
