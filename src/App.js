import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import Header from "./components/Header";
import { useState } from "react";
import employees from "./data/employees";
import EditEmployee from "./pages/EditEmployee";

function App() {
  const [employeeList, setEmployeeList] = useState(employees);
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              employeeList={employeeList}
              setEmployeeList={setEmployeeList}
            />
          }
        />
        <Route
          path="/employees"
          element={
            <Home
              employeeList={employeeList}
              setEmployeeList={setEmployeeList}
            />
          }
        />
        <Route
          path="/add-employee"
          element={
            <AddEmployee
              employeeList={employeeList}
              setEmployeeList={setEmployeeList}
            />
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            <EditEmployee
              employeeList={employeeList}
              setEmployeeList={setEmployeeList}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
