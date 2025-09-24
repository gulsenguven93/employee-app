import React, { useState } from "react";
import EmployeeList from "../components/EmployeeList";
import EmployeeCard from "../components/EmployeeCard";
import ModalDelete from "../components/ModalDelete";
import { ListIcon, CardIcon } from "../icons";
import "../styles/ViewToggle.css";
import { useTranslation } from "react-i18next";

const Home = ({ employeeList, setEmployeeList }) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDelete = (id) => {
    const filtered = employeeList.filter((emp) => emp.id !== id);
    setEmployeeList(filtered);
  };

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">{t("home.title")}</h1>
        <div className="view-toggle">
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
        <EmployeeList
          employeeList={employeeList}
          setEmployeeList={setEmployeeList}
        />
      ) : (
        <div className="cards-grid">
          {employeeList.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onDelete={handleOpenModal}
            />
          ))}
        </div>
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
