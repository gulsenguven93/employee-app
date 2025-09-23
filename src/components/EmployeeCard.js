import React from "react";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "../icons";
import "../styles/EmployeeCard.css";
import { useTranslation } from "react-i18next";

const EmployeeCard = ({ employee, onDelete }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="employee-card">
      <div className="card-header">
        <h3>
          {employee.firstName} {employee.lastName}
        </h3>
      </div>

      <div className="card-body">
        <div className="card-row">
          <span className="label">{t("employeeCard.email")}:</span>
          <span className="value">{employee.email}</span>
        </div>

        <div className="card-row">
          <span className="label">{t("employeeCard.phone")}:</span>
          <span className="value">{employee.phone}</span>
        </div>

        <div className="card-row">
          <span className="label">{t("employeeCard.department")}:</span>
          <span className="value">{employee.department}</span>
        </div>

        <div className="card-row">
          <span className="label">{t("employeeCard.position")}:</span>
          <span className="value">{employee.position}</span>
        </div>

        <div className="card-row">
          <span className="label">{t("employeeCard.employmentDate")}:</span>
          <span className="value">{employee.dateOfEmployment}</span>
        </div>

        <div className="card-row">
          <span className="label">{t("employeeCard.birthDate")}:</span>
          <span className="value">{employee.dateOfBirth}</span>
        </div>
      </div>

      <div className="card-footer">
        <button
          className="card-btn edit-btn"
          onClick={() => navigate(`/edit-employee/${employee.id}`)}
          title={t("employeeCard.editTitle")}
        >
          <EditIcon size={16} color="#FF6101" />
          <span>{t("employeeCard.edit")}</span>
        </button>

        <button
          className="card-btn delete-btn"
          onClick={() => onDelete(employee.id)}
          title={t("employeeCard.deleteTitle")}
        >
          <DeleteIcon size={16} color="#FF6101" />
          <span>{t("employeeCard.delete")}</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
