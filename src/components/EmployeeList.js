import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeList.css";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import ModalDelete from "./ModalDelete";
import { useTranslation } from "react-i18next";
import { usePagination } from "../hooks/usePagination";

const EmployeeList = ({ employeeList, setEmployeeList }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const filtered = employeeList.filter((emp) => emp.id !== id);
    setEmployeeList(filtered);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { currentPage, maxPage, currentData, next, prev, jump } = usePagination(
    employeeList,
    10
  );

  return (
    <section className="container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>{t("employeeList.name")}</th>
            <th>{t("employeeList.email")}</th>
            <th>{t("employeeList.phone")}</th>
            <th>{t("employeeList.department")}</th>
            <th>{t("employeeList.position")}</th>
            <th>{t("employeeList.dateOfEmployment")}</th>
            <th>{t("employeeList.dateOfBirth")}</th>
            <th>{t("employeeList.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {currentData().map((employee) => (
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
                  title={t("employeeList.editEmployee")}
                >
                  <EditIcon size={16} color="#FF6101" />
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedEmployee(employee);
                  }}
                  title={t("employeeList.deleteEmployee")}
                >
                  <DeleteIcon size={16} color="#FF6101" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => prev()}>{t("employeeList.previous")}</button>

        {Array.from({ length: maxPage }, (_, i) => (
          <button
            key={i}
            onClick={() => jump(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => next()}>{t("employeeList.next")}</button>
      </div>

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
