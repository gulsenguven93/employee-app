import React from "react";
import EmployeeList from "../components/EmployeeList";

const Home = ({ employeeList, setEmployeeList }) => {
  return (
    <>
      <EmployeeList
        employeeList={employeeList}
        setEmployeeList={setEmployeeList}
      />
    </>
  );
};

export default Home;
