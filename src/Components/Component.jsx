import React from "react";
import { useState } from "react";
import {
  decryptedEmail,
  SECRET_EMAIL,
  SECRET_PASSWORD,
} from "../helpers/utils";

const EyeIcon = ({ visible }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="cursor-pointer"
    viewBox="0 0 24 24"
  >
    {visible ? (
      // Eye open
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    ) : (
      // Eye off
      <>
        <path d="M17.94 17.94A10.97 10.97 0 0 1 12 20c-7 0-11-8-11-8a21.05 21.05 0 0 1 5.17-6.11" />
        <path d="M22 12s-1.45 2.9-4.06 5.12M1 1l22 22" />
      </>
    )}
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const PasswordField = ({
  label = "Password",
  name,
  placeholder = "Enter password",
  formik = {},
}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible((prev) => !prev);
  const error = formik?.touched?.[name] && formik?.errors?.[name];
  const value = formik?.values?.[name] || "";

  return (
    <div className="col-12 position-relative password-field">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="position-relative">
        <input
          id={name}
          type={visible ? "text" : "password"}
          name={name}
          className={`form-control form-control-lg fs-6 pe-5 ${
            error ? "is-invalid" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span
          className="position-absolute top-50 end-0 translate-middle-y me-3"
          onClick={toggleVisibility}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleVisibility();
          }}
        >
          <EyeIcon visible={visible} />
        </span>
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export const isLogin = () => {
  const loginStatus = localStorage.getItem("loginStatus") === "true";
  const login =
    SECRET_EMAIL === decryptedEmail || SECRET_PASSWORD === decryptedEmail;
  return loginStatus && login;
};
