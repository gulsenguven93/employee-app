import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="app-header">
      <div className="app-header-logo">ING</div>
      <nav>
        <ul>
          <li>
            <Link to="/employees">{t("header.employees")}</Link>
          </li>
          <li>
            <Link to="/add-employee">{t("header.addNew")}</Link>
          </li>
          <li>
            <LanguageSelector language={i18n.language} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
