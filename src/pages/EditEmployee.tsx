import React from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateEmployee } from "../store/employeeSlice";

const EditEmployee: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const employeeList = useSelector((state: RootState) => state.employees.list);

  const employee = employeeList.find((emp) => emp.id === Number(id));

  const handleSubmit = (updatedEmployee) => {
    dispatch(updateEmployee(updatedEmployee));
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
