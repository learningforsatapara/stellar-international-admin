import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

import ErrorLogo from "../assets/image/default/404.svg";
import { isLogin } from "../Components/Component";

/** Environment */
export const IS_DEV = false;

/** User Roles */
export const ROLE = {
  ADMIN: "admin",
  SUB_ADMIN: "sub-admin",
  VIEW: "view",
};

/** Client URL */
export const CLIENT_URL = IS_DEV
  ? "http://localhost:3000/"
  : "www.project-change.co.in/";

/** API URL */
export const API_VERSION = `v1`;
export const API_URL = IS_DEV
  ? `http://localhost:5000/api/${API_VERSION}`
  : `www.project-change.co.in/api/${API_VERSION}`;
export const API_ACCESS_TOKEN = IS_DEV ? "" : "";
export const BUCKET_URL = IS_DEV
  ? "https://s3.ap-south-1.amazonaws.com/alias-name"
  : "https://s3.ap-south-1.amazonaws.com/alias-name";

export const PROFILE_URL = BUCKET_URL + "/profile";

export const APIKEY = import.meta.env.VITE_API_KEY;
export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
export const SECRET_EMAIL = import.meta.env.VITE_EMAIL;
export const SECRET_PASSWORD = import.meta.env.VITE_PASSWORD;

/** Common Variables */
export const EMAIL_REGEX = /^[\w+-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const PHONE_REGEX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const ONLY_NUMBERS_REGEX = /^[0-9]+$/;
export const ONLY_ALPHABETS_REGEX = /^[A-Za-z ]+$/;

/** Date Functions Starts */
export const dateFormat = "DD MMM, YYYY";
export const dataYYYY = "YYYY";
export const dataMMMM = "MMMM";
export const dataMMM = "MMM";
export const dataDate = "DD";
export const dataTime = "hh:MM A";
export const dateWithTime = "DD MMMM YYYY - hh:MM A";
export const momentDDMMYY = (data) => moment(data).format(dateFormat);
export const momentYYYY = (data) => moment(data).format(dataYYYY);
export const momentMMMM = (data) => moment(data).format(dataMMMM);
export const momentMMM = (data) => moment(data).format(dataMMM);
export const momentDD = (data) => moment(data).format(dataDate);
export const momentHHMMA = (data) => moment(data).format(dataTime);
export const momentFullTime = (data) => moment(data).format(dateWithTime);
/** Date Functions Ends */

/** Error Handling Functions Starts */
export const dispatchLoading = (dispatch, scope, status) =>
  dispatch({ type: "SET_LOADING", payload: { scope, status } });

export const dispatchToast = (dispatch, scope, status) =>
  dispatch({ type: "SET_TOAST", payload: { scope, status } });

export const dispatchError = (dispatch, scope, status) =>
  dispatch({ type: "SET_ERROR", payload: { scope, status } });

export const catchHandler = (dispatch, scope) => (err) => {
  console.log("Err", err);
  let errMsg = err?.response?.data?.msg
    ? err?.response?.data?.msg
    : err?.response?.data?.message
    ? err?.response?.data?.message
    : err?.response?.data?.error
    ? err?.response?.data?.error
    : "Something went wrong";
  dispatchToast(dispatch, "error", errMsg);
  if (err.code === "ERR_NETWORK")
    dispatchToast(dispatch, "error", "Unable to connect to server");
  else if (err?.response?.status !== 401) {
    dispatchError(dispatch, scope, [errMsg]);
  } else if (err?.response?.status === 401) {
    localStorage.setItem("isLoggedIn", false);
    dispatchError(dispatch, scope, [errMsg]);
    // window.location.assign(`${CLIENT_URL}/auth/login`);
  } else dispatchToast(dispatch, "error", errMsg);
  dispatchLoading(dispatch, scope, false);
  dispatchError(dispatch, scope, [errMsg]);
};

export const elseHandler = (dispatch, scope, data) => {
  dispatchToast(dispatch, "error", data?.msg);
  dispatchError(dispatch, scope, data?.error);
};

export const ErrorFallbackPage = ({ error, resetErrorBoundary }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  // Use Navigate
  const navigate = useNavigate();

  // Use location
  const { pathname } = useLocation();

  // Use Ref
  const originalPathname = useRef(pathname);

  // Goto previous Page
  const goToBack = () => {
    navigate(-1);
  };

  // Use Effect
  useEffect(() => {
    if (pathname !== originalPathname.current) resetErrorBoundary();
  }, [pathname, resetErrorBoundary]);

  return (
    <div
      className="text-center w-100 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <div className="px-3 mb-4 header-logo">
          <img
            src={ErrorLogo}
            alt="header logo"
            className="img-fluid"
            onClick={(e) => navigate("/")}
          />
        </div>
        <h5 className="ff_rg mb-1 fs-5 fw-bold">Something went wrong!</h5>
        <p className="ff_rg fs-6">
          There was a problem connecting to portion.
          <span className="d-block ff_rg fs-6 mx-3">
            Please refresh the page or check your connection.
          </span>
        </p>
        <p className="ff_rg f14 mt-3 text-secondary">
          Something’s not right ?{" "}
          <span className="ff_md f14 text-dark">
            Contact us at :{" "}
            <Link
              className="ff_md f14 text-dark"
              to="mailto: info.stellarint@gmail.com"
            >
              info.stellarint@gmail.com
            </Link>{" "}
          </span>
        </p>
        <button
          className="btn btn-primary text-uppercase fs-6 px-3 txt-white mt-3"
          onClick={() => goToBack()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
/** Error Handling Functions Ends */

/** Loader */
export const SiteLoader = ({ text }) => {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "calc(100% - 1rem)",
      }}
    >
      <div className="Loader">
        <div className="d-block">
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
      <p style={{ fontSize: "1.5rem", lineHeight: "1.1" }}>
        {text !== undefined
          ? text
          : "Please wait a moment while we arrange some things"}
      </p>
    </div>
  );
};

const decryptFromStorage = (key) => {
  const encryptedData = localStorage.getItem(key);
  if (!encryptedData) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error(`Error decrypting ${key}:`, err);
    return null;
  }
};

export const decryptedEmail = decryptFromStorage("email");
export const decryptedPassword = decryptFromStorage("password");

export const PrivateRoute = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const login = isLogin();
  return login ? children : <Navigate to="/auth/login" replace />;
};
