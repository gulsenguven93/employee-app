import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import Header from "./components/Header";
import EditEmployee from "./pages/EditEmployee";
import employees from "./data/employees";
import { useEmployeeStore } from "./store/employeeStore";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const employeeList = useEmployeeStore((state) => state.employees);
  const setEmployees = useEmployeeStore((state) => state.setEmployees);

  useEffect(() => {
    if (employeeList.length === 0) {
      setEmployees(employees);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Home />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
