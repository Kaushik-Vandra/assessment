import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { LOGIN_F } from "../../../constants";
import "./header.scss";

const Header = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({ type: LOGIN_F });
  };
  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Header</h2>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </div> */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH4GD8ePzOVj1rwrazp8wrv76mDITdUlS5Qw&usqp=CAU"
                height="30"
                alt="Logo"
                loading="lazy"
              />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="add-shipment">
                  Add Shipment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="article-management">
                  Article Management
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <div className="dropdown">
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-2x"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <Link className="dropdown-item" to="/change-password">
                    Change Password
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" onClick={onLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
