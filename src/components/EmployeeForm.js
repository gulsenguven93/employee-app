import React from "react";
import "../styles/EmployeeForm.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const EmployeeForm = ({ initialData, onSubmit, buttonText, title }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfEmployment: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    department: "",
    position: "",
    id: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="add-employee-page">
      <h1 className="page-title">{title}</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label htmlFor="firstName">FirstName</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="lastName">LastName</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="dateOfEmployment">Date of Employment</label>
              <input
                type="date"
                id="dateOfEmployment"
                name="dateOfEmployment"
                value={formData.dateOfEmployment}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{11}"
                placeholder="05XXXXXXXXX"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="position">Position</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                <option value="junior">Junior</option>
                <option value="manager">Manager</option>
                <option value="developer">Developer</option>
                <option value="analyst">Analyst</option>
              </select>
            </div>

            <div></div>
          </div>
          <div className="form-actions">
            <button type="submit">{buttonText}</button>
            <button type="button" onClick={() => navigate("/")}>
              {" "}
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
