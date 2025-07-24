import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";

// Assets
import LoginBackground from "../assets/image/login-background.jpg";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";

// CSS
import "./style.scss";

// Validation
import { loginValidationSchema } from "../helpers/schema/authSchema";
import { PasswordField } from "../Components/Component";
import {
  dispatchToast,
  SECRET_EMAIL,
  SECRET_KEY,
  SECRET_PASSWORD,
} from "../helpers/utils";

const Login = () => {
  // Use
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selecotr
  const { loginLoading } = useSelector((state) => state.loading);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      if (
        values?.email === SECRET_EMAIL &&
        values?.password === SECRET_PASSWORD
      ) {
        const encryptedEmail = CryptoJS.AES.encrypt(
          SECRET_EMAIL,
          SECRET_KEY
        ).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(
          SECRET_PASSWORD,
          SECRET_KEY
        ).toString();
        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("email", encryptedEmail);
        localStorage.setItem("password", encryptedPassword);
        navigate("/");
        dispatchToast(
          dispatch,
          "success",
          "🎉 Login successful! Welcome back."
        );
      } else {
        toast.error("Invalid Credentials");
      }
    },
  });

  return (
    <div className="login-page min-vh-100 px-sm-4 px-3 py-5 d-flex flex-column align-items-center justify-content-center position-relative">
      <img
        src={LoginBackground}
        className="position-fixed top-0 start-0 w-100 h-100 object-fit-cover"
        alt="login-background"
      />

      <div className="login_form mw-100 position-relative z-1">
        <div className="card rounded-3 border-0">
          <div className="card-body">
            <h3 className="text-center fw-bold mb-4">Login</h3>
            <form
              onSubmit={formik.handleSubmit}
              noValidate
              className="row g-4 mt-0"
            >
              {/* Email */}
              <div className="col-12">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control form-control-lg fs-6 ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-feedback">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>

              {/* Password */}
              <PasswordField
                label="Password"
                name="password"
                placeholder="Enter your password"
                formik={formik}
              />

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-3 min-width-120"
                >
                  Login{" "}
                  {loginLoading && (
                    <Spin
                      indicator={<LoadingOutlined spin />}
                      size="medium"
                      className="text-white ms-2"
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
