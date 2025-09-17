import React from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

const AddEmployee = ({ employeeList, setEmployeeList }) => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    const newEmployee = {
      ...formData,
      id: Date.now(),
    };
    setEmployeeList([...employeeList, newEmployee]);
    navigate("/");
  };

  return (
    <EmployeeForm
      onSubmit={handleSubmit}
      buttonText="Add Employee"
      title="Add Employee"
    />
  );
};

export default AddEmployee;
