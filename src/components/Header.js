import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="app-header">
      <div className="app-header-logo">ING</div>
      <nav>
        <ul>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
          <li>
            <Link to="/add-employee">+Add New</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
