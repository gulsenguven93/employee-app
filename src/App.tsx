import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmployee";
import Header from "./components/Header";
import EditEmployee from "./pages/EditEmployee";
import employees from "./data/employees";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setEmployees } from "./store/employeeSlice";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const dispatch = useDispatch();
  const employeeList = useSelector((state: RootState) => state.employees.list);

  useEffect(() => {
    if (employeeList.length === 0) {
      dispatch(setEmployees(employees));
    }
  }, [dispatch, employeeList.length]);

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
