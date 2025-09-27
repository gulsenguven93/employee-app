import React from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { useTranslation } from "react-i18next";

const AddEmployee = ({ employeeList, setEmployeeList }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (formData) => {
    const newId = Math.max(...employeeList.map((emp) => emp.id)) + 1;
    const newEmployee = {
      ...formData,
      id: newId,
    };
    setEmployeeList([...employeeList, newEmployee]);
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
