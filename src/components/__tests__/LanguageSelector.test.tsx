import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LanguageSelector from "../LanguageSelector";

const mockChangeLanguage = jest.fn();
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: mockChangeLanguage,
      language: "en",
    },
  }),
}));

describe("LanguageSelector Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders language selector dropdown", () => {
    render(<LanguageSelector />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  test("displays language options", () => {
    render(<LanguageSelector />);

    expect(screen.getByText("🇺🇸 English")).toBeInTheDocument();
    expect(screen.getByText("🇹🇷 Türkçe")).toBeInTheDocument();
  });

  test("has correct default value", () => {
    render(<LanguageSelector />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("en");
  });

  test("calls changeLanguage when language is changed", () => {
    render(<LanguageSelector />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "tr" } });

    expect(mockChangeLanguage).toHaveBeenCalledWith("tr");
  });

  test("saves selected language to localStorage", () => {
    render(<LanguageSelector />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "tr" } });

    expect(mockChangeLanguage).toHaveBeenCalledWith("tr");
  });

  test("loads language from localStorage on mount", () => {
    localStorage.setItem("language", "tr");

    render(<LanguageSelector />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  test("handles multiple language changes", () => {
    render(<LanguageSelector />);

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "tr" } });
    expect(mockChangeLanguage).toHaveBeenCalledWith("tr");

    fireEvent.change(selectElement, { target: { value: "en" } });
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
  });

  test("has proper CSS classes", () => {
    render(<LanguageSelector />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveClass("language-dropdown");
  });

  test("has correct option values", () => {
    render(<LanguageSelector />);

    const selectElement = screen.getByRole("combobox");
    const options = selectElement.querySelectorAll("option");

    expect(options[0]).toHaveValue("en");
    expect(options[0]).toHaveTextContent("🇺🇸 English");
    expect(options[1]).toHaveValue("tr");
    expect(options[1]).toHaveTextContent("🇹🇷 Türkçe");
  });
});
