import React from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addEmployee } from "../store/employeeSlice";

const AddEmployee: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const employeeList = useSelector((state: RootState) => state.employees.list);

  const handleSubmit = (formData) => {
    const newId =
      employeeList.length > 0
        ? Math.max(...employeeList.map((emp) => emp.id)) + 1
        : 1;

    const newEmployee = {
      ...formData,
      id: newId,
    };
    dispatch(addEmployee(newEmployee));
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
