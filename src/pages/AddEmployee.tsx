import React from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { useTranslation } from "react-i18next";
import { useEmployeeStore } from "../store/employeeStore";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const employeeList = useEmployeeStore((state) => state.employees);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const handleSubmit = (formData) => {
    const newId = Math.max(...employeeList.map((emp) => emp.id)) + 1;
    const newEmployee = {
      ...formData,
      id: newId,
    };
    addEmployee(newEmployee);
    navigate("/");
  };

  return (
    <EmployeeForm
      onSubmit={handleSubmit}
      buttonText={t("addEmployee.button")}
      title={t("addEmployee.title")}
    />
  );
};

export default AddEmployee;
