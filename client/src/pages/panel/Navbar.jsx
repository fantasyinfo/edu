import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <NavLink
          to="/panel-admin/dashboard"
          className="sidebar-brand brand-logo"
        >
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
          <NavLink to="/panel-admin/dashboard" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/forms" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Forms</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/leads" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Lead Links</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/admissions-enquiry" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Admission Enquiries</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/departments" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Departments</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/programs" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Programs</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/batches" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Batches</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/faculties" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Faculties</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/subjects" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Subjects</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/students" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Students</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/grade-schemes" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Grade Schemes</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/timetable" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">TimeTable</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/academic-calender" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Academic Calender</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/notification-center" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">Notification Center</span>
          </NavLink>
        </li>
        <li className="nav-item menu-items">
          <NavLink to="/panel-admin/feedback" className="nav-link">
            <span className="menu-icon">
              <i className="mdi mdi-speedometer"></i>
            </span>
            <span className="menu-title">
              Subject + Faculty <br /> Feedback
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
