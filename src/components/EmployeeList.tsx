import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeList.css";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import ModalDelete from "./ModalDelete";
import { useTranslation } from "react-i18next";
import { usePagination } from "../hooks/usePagination";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteEmployee } from "../store/employeeSlice";

interface EmployeeData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  dateOfEmployment: string;
  dateOfBirth: string;
}

const EmployeeList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const employeeList = useSelector((state: RootState) => state.employees.list);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(
    null
  );

  // Checkbox state'leri
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  // Select All fonksiyonu
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      // Tüm satırları seç
      const currentPageEmployeeIds = currentData().map((emp) => emp.id);
      setSelectedRows(new Set(currentPageEmployeeIds));
    } else {
      // Tüm seçimleri kaldır
      setSelectedRows(new Set());
    }
  };

  // Tekil satır seçimi
  const handleRowSelect = (employeeId: number) => {
    const newSelectedRows = new Set(selectedRows);

    if (newSelectedRows.has(employeeId)) {
      newSelectedRows.delete(employeeId);
    } else {
      newSelectedRows.add(employeeId);
    }

    setSelectedRows(newSelectedRows);

    // Select all checkbox'ını güncelle
    const currentPageEmployeeIds = currentData().map((emp) => emp.id);
    const allSelected = currentPageEmployeeIds.every((id) =>
      newSelectedRows.has(id)
    );
    setSelectAll(allSelected && newSelectedRows.size > 0);
  };

  const { currentPage, maxPage, currentData, next, prev, jump } = usePagination(
    employeeList,
    10
  );

  // Sayfa değiştiğinde checkbox state'lerini sıfırla
  useEffect(() => {
    setSelectAll(false);
    setSelectedRows(new Set());
  }, [currentPage]);

  return (
    <section className="container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
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
                <input
                  type="checkbox"
                  checked={selectedRows.has(employee.id)}
                  onChange={() => handleRowSelect(employee.id)}
                />
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
          if (selectedEmployee) {
            handleDelete(selectedEmployee.id);
          }
          setIsModalOpen(false);
        }}
      />
    </section>
  );
};

export default EmployeeList;
