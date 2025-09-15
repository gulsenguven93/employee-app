import React from "react";
import "../styles/Modal.css";

const ModalDelete = ({ isOpen, onClose, employee, onDelete }) => {
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          x
        </button>
        <h1>Are you sure?</h1>
        <p>
          Selected employee record of {employee.firstName} {employee.lastName}{" "}
          will be deleted.
        </p>
        <div className="modal-footer">
          <button className="btn delete-btn" onClick={onDelete}>
            Proceed
          </button>
          <button className="btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
