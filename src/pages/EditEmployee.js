import React from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditEmployee = ({ employeeList, setEmployeeList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      buttonText="Update Employee"
      title="Edit Employee"
    />
  );
};

export default EditEmployee;
