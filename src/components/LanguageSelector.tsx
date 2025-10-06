import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/LanguageSelector.css";

interface LanguageSelectorProps {
  language: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-selector">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-dropdown"
      >
        <option value="en">🇺🇸 English</option>
        <option value="tr">🇹🇷 Türkçe</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
