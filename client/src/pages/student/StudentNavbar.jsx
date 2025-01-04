import React from "react";
import { NavLink } from "react-router-dom";

const StudentNavbar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <NavLink to="/dashboard" className="sidebar-brand brand-logo">
          <img
            src="https://www.dmtims.edu.in/_next/image?url=%2FnewImages%2FdmtimsLogo.webp&w=1920&q=75"
            alt="logo"
          />
        </NavLink>
        <NavLink to="/dashboard" className="sidebar-brand brand-logo-mini">
          <img
            src="https://www.dmtims.edu.in/_next/image?url=%2FnewImages%2FdmtimsLogo.webp&w=1920&q=75"
            alt="logo"
          />
        </NavLink>
      </div>
      <ul className="nav">
        <li className="nav-item menu-items">
          <NavLink to="/dashboard" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/forms" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Forms</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/student/timetable" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">TimeTable</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default StudentNavbar;
