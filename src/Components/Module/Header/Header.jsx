import React from "react";
import { NavLink } from "react-router-dom";

// SCSS
import "./style.scss";

import Logo from "../../../assets/image/logo.png";

const Header = () => {
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
