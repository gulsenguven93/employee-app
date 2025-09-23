import React from "react";
import "../styles/EmployeeForm.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const EmployeeForm = ({ initialData, onSubmit, buttonText, title }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
              <label htmlFor="firstName">{t("employeeForm.firstName")}</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="lastName">{t("employeeForm.lastName")}</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="dateOfEmployment">
                {t("employeeForm.dateOfEmployment")}
              </label>
              <input
                type="date"
                id="dateOfEmployment"
                name="dateOfEmployment"
                value={formData.dateOfEmployment}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth">
                {t("employeeForm.dateOfBirth")}
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone">{t("employeeForm.phone")}</label>
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
              <label htmlFor="email">{t("employeeForm.email")}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="department">{t("employeeForm.department")}</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="position">{t("employeeForm.position")}</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="">{t("employeeForm.pleaseSelect")}</option>
                <option value="junior">{t("employeeForm.junior")}</option>
                <option value="manager">{t("employeeForm.manager")}</option>
                <option value="developer">{t("employeeForm.developer")}</option>
                <option value="analyst">{t("employeeForm.analyst")}</option>
              </select>
            </div>

            <div></div>
          </div>
          <div className="form-actions">
            <button type="submit">{buttonText}</button>
            <button type="button" onClick={() => navigate("/")}>
              {t("employeeForm.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
