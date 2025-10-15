import React, { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeCard from "../components/EmployeeCard";
import ModalDelete from "../components/ModalDelete";
import { ListIcon, CardIcon } from "../icons";
import { usePagination } from "../hooks/usePagination";
import "../styles/ViewToggle.css";
import "../styles/EmployeeCard.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteEmployee } from "../store/employeeSlice";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  const employees = useSelector((state: RootState) => state.employees.list);

  const [viewMode, setViewMode] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase())
  );

  const { currentPage, maxPage, currentData, next, prev, jump } = usePagination(
    filteredEmployees,
    12
  );

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`container ${theme === "dark" ? "dark-mode" : "light-mode"}`}
    >
      <div className="page-header">
        <h1 className="page-title">{t("home.title")}</h1>
        <div className="view-toggle">
          <input
            type="text"
            placeholder={
              t("employeeList.searchPlaceholder") || "Search by name..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{
              padding: "8px",
              width: "250px",
              height: "23px",
              marginBottom: "16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button
            className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <ListIcon size={20} />
          </button>
          <button
            className={`view-toggle-btn ${viewMode === "card" ? "active" : ""}`}
            onClick={() => setViewMode("card")}
            title="Card View"
          >
            <CardIcon size={20} />
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <EmployeeList employees={filteredEmployees} />
      ) : (
        <>
          <div className="cards-grid">
            {currentData().map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onDelete={handleOpenModal}
              />
            ))}
          </div>

          {maxPage > 1 && (
            <div className="pagination">
              <button
                onClick={() => prev()}
                disabled={currentPage === 1}
                className="pagination-btn prev-btn"
              >
                {t("employeeList.previous")}
              </button>

              {Array.from({ length: maxPage }, (_, i) => (
                <button
                  key={i}
                  onClick={() => jump(i + 1)}
                  disabled={currentPage === i + 1}
                  className={`pagination-btn ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => next()}
                disabled={currentPage === maxPage}
                className="pagination-btn next-btn"
              >
                {t("employeeList.next")}
              </button>
            </div>
          )}
        </>
      )}

      <ModalDelete
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={selectedEmployee}
        onDelete={() => {
          handleDelete(selectedEmployee?.id);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Home;
