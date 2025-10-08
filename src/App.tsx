import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import Header from "./components/Header";
import EditEmployee from "./pages/EditEmployee";
import employees from "./data/employees";
import { useEmployeeStore } from "./store/employeeStore";

function App() {
  const setEmployees = useEmployeeStore((state) => state.setEmployees);

  useEffect(() => {
    setEmployees(employees);
  }, [setEmployees]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
