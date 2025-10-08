import React from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEmployeeStore } from "../store/employeeStore";

const EditEmployee: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const employeeList = useEmployeeStore((state) => state.employees);
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);

  const employee = employeeList.find((emp) => emp.id === Number(id));

  const handleSubmit = (updatedEmployee) => {
    updateEmployee(updatedEmployee);
    navigate("/");
  };

  if (!employee) {
    return (
      <div>
        {t("employeeForm.notFound", { defaultValue: "Employee not found" })}
      </div>
    );
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
