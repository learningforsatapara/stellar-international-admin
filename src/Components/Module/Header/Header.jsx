import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

// SCSS
import "./style.scss";

import Logo from "../../../assets/image/logo.png";
import svg from "../../../assets/svg";
import { dispatchToast } from "../../../helpers/utils";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <header className="header py-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <img src={Logo} className="img-fluid" alt="staller international" />
          </div>
          <div className="d-flex align-items-center justify-content-between gap-3 nav-list">
            <NavLink className="nav-link" to="/theme">
              Theme
            </NavLink>
            <NavLink className="nav-link" to="/package">
              Package
            </NavLink>
            <button
              className="nav-link logout-btn"
              onClick={() => {
                localStorage.removeItem("email");
                localStorage.removeItem("password");
                localStorage.removeItem("loginStatus");
                navigate("/auth/login");
                dispatchToast(
                  dispatch,
                  "success",
                  "👋 You have been logged out successfully."
                );
              }}
            >
              {svg?.logout}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
