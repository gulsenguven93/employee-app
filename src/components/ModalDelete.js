import React from "react";
import "../styles/Modal.css";
import { useTranslation } from "react-i18next";

const ModalDelete = ({ isOpen, onClose, employee, onDelete }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          x
        </button>
        <h1>{t("modalDelete.title")}</h1>
        <p>
          {t("modalDelete.text", {
            name: `${employee.firstName} ${employee.lastName}`,
          })}
        </p>
        <div className="modal-footer">
          <button className="btn delete-btn" onClick={onDelete}>
            {t("modalDelete.button")}
          </button>
          <button className="btn cancel-btn" onClick={onClose}>
            {t("employeeForm.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
