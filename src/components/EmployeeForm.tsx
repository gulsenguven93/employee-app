import React from "react";
import "../styles/EmployeeForm.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfEmployment: string;
  dateOfBirth: string;
  phone: string;
  position: string;
  department: string;
  id: number;
}

type EmployeeFormProps = {
  initialData?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => void;
  buttonText: string;
  title: string;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
  buttonText,
  title,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, t("employeeForm.firstNameRequired"))
      .required(t("employeeForm.firstNameRequired")),
    lastName: yup
      .string()
      .min(2, t("employeeForm.lastNameRequired"))
      .required(t("employeeForm.lastNameRequired")),
    email: yup
      .string()
      .email(t("employeeForm.emailInvalid"))
      .required(t("employeeForm.emailRequired")),
    dateOfEmployment: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, t("employeeForm.dateOfEmploymentInvalid"))
      .required(t("employeeForm.dateOfEmploymentRequired")),
    dateOfBirth: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, t("employeeForm.dateOfBirthInvalid"))
      .required(t("employeeForm.dateOfBirthRequired")),
    phone: yup
      .string()
      .matches(/^[0-9+\s-]{10,15}$/, t("employeeForm.phoneInvalid"))
      .required(t("employeeForm.phoneRequired")),
    position: yup.string().required(t("employeeForm.positionRequired")),
    department: yup.string().required(t("employeeForm.departmentRequired")),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(schema) as unknown as Resolver<EmployeeFormData>,
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      dateOfEmployment: initialData?.dateOfEmployment || "",
      dateOfBirth: initialData?.dateOfBirth || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      department: initialData?.department || "",
      position: initialData?.position || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      (Object.keys(initialData) as (keyof EmployeeFormData)[]).forEach(
        (key) => {
          if (key !== "id") {
            setValue(key, initialData[key]);
          }
        }
      );
    }
  }, [initialData, setValue]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="add-employee-page">
      <h1 className="page-title">{title}</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-group">
            <div>
              <label htmlFor="firstName">{t("employeeForm.firstName")}</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && (
                <span className="error-message">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="lastName">{t("employeeForm.lastName")}</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="dateOfEmployment">
                {t("employeeForm.dateOfEmployment")}
              </label>
              <input
                type="date"
                id="dateOfEmployment"
                {...register("dateOfEmployment")}
                className={errors.dateOfEmployment ? "error" : ""}
              />
              {errors.dateOfEmployment && (
                <span className="error-message">
                  {errors.dateOfEmployment.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth">
                {t("employeeForm.dateOfBirth")}
              </label>
              <input
                type="date"
                id="dateOfBirth"
                {...register("dateOfBirth")}
                className={errors.dateOfBirth ? "error" : ""}
              />
              {errors.dateOfBirth && (
                <span className="error-message">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="phone">{t("employeeForm.phone")}</label>
              <input
                type="tel"
                id="phone"
                placeholder="05XXXXXXXXX"
                {...register("phone")}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="email">{t("employeeForm.email")}</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="department">{t("employeeForm.department")}</label>
              <input
                type="text"
                id="department"
                {...register("department")}
                className={errors.department ? "error" : ""}
              />
              {errors.department && (
                <span className="error-message">
                  {errors.department.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="position">{t("employeeForm.position")}</label>
              <select
                id="position"
                {...register("position")}
                className={errors.position ? "error" : ""}
              >
                <option value="">{t("employeeForm.pleaseSelect")}</option>
                <option value="junior">{t("employeeForm.junior")}</option>
                <option value="manager">{t("employeeForm.manager")}</option>
                <option value="developer">{t("employeeForm.developer")}</option>
                <option value="analyst">{t("employeeForm.analyst")}</option>
              </select>
              {errors.position && (
                <span className="error-message">{errors.position.message}</span>
              )}
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
