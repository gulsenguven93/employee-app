import React from "react";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "../icons";
import "../styles/EmployeeCard.css";

const EmployeeCard = ({ employee, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="employee-card">
      <div className="card-header">
        <h3>
          {employee.firstName} {employee.lastName}
        </h3>
      </div>

      <div className="card-body">
        <div className="card-row">
          <span className="label">Email:</span>
          <span className="value">{employee.email}</span>
        </div>

        <div className="card-row">
          <span className="label">Phone:</span>
          <span className="value">{employee.phone}</span>
        </div>

        <div className="card-row">
          <span className="label">Department:</span>
          <span className="value">{employee.department}</span>
        </div>

        <div className="card-row">
          <span className="label">Position:</span>
          <span className="value">{employee.position}</span>
        </div>

        <div className="card-row">
          <span className="label">Employment Date:</span>
          <span className="value">{employee.dateOfEmployment}</span>
        </div>

        <div className="card-row">
          <span className="label">Birth Date:</span>
          <span className="value">{employee.dateOfBirth}</span>
        </div>
      </div>

      <div className="card-footer">
        <button
          className="card-btn edit-btn"
          onClick={() => navigate(`/edit-employee/${employee.id}`)}
          title="Edit Employee"
        >
          <EditIcon size={16} color="#FF6101" />
          <span>Edit</span>
        </button>

        <button
          className="card-btn delete-btn"
          onClick={() => onDelete(employee.id)}
          title="Delete Employee"
        >
          <DeleteIcon size={16} color="#FF6101" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
