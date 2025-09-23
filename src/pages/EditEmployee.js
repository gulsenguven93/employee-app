import React from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditEmployee = ({ employeeList, setEmployeeList }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const employee = employeeList.find((emp) => emp.id === Number(id));

  const handleSubmit = (updatedEmployee) => {
    const updatedEmployeeList = employeeList.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployeeList(updatedEmployeeList);
    navigate("/");
  };

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <EmployeeForm
      initialData={employee}
      onSubmit={handleSubmit}
      buttonText={t("employeeForm.submit")}
      title={t("employeeForm.title")}
    />
  );
};

export default EditEmployee;
